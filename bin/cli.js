#!/usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

/**
 * Infandev Kit - CLI Wrapper & Native Compiler
 * npx @infandev/agent-kit [command] [options]
 */

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === "--help" || command === "-h") {
  console.log(`
  🚀 @infandev/agent-kit - Infandev OS
  -----------------------------------------------
  Usage: npx @infandev/agent-kit <command> [options]

  Commands:
    init         🔥 Bootstrap the .agent kit (supports native flags!)
    compile      ⚡ Sync .agent master rules to native IDE formats

  Options (for both init and compile):
    --cursor       Compile native rule files for Cursor (.mdc)
    --windsurf     Compile native rule files for Windsurf (AGENTS.md)
    --vscode       Compile native rule files for VS Code (.github/copilot-instructions.md)
    --antigravity  Clone raw .agent source to .agent/ (For Aider/RooCode)
  `);
  process.exit(0);
}

const PACKAGE_ROOT = path.join(__dirname, "..");
const AGENT_ROOT = path.join(PACKAGE_ROOT, ".agent");

// --- UTILS ---

function extractMarkdownData(content) {
  let frontmatter = {};
  let body = content;

  if (content.startsWith("---")) {
    const match = content.match(/---\n([\s\S]*?)\n---([\s\S]*)/);
    if (match) {
      const fmText = match[1];
      body = match[2].trim();
      
      fmText.split("\n").forEach((line) => {
        if (line.includes(":")) {
          const [k, ...v] = line.split(":");
          frontmatter[k.trim()] = v.join(":").trim();
        }
      });
      
      // parse skills into array if present
      if (frontmatter.skills) {
          const rawSkills = fmText.match(/skills:\n([\s\S]*?)(?:\n[a-z0-9]+:|$)/i);
          if (rawSkills && rawSkills[1]) {
             frontmatter.skillsArray = rawSkills[1]
              .split('\n')
              .map(s => s.replace('-', '').trim())
              .filter(s => s.length > 0);
          }
      }
    }
  }
  return { frontmatter, body };
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// --- COMPILERS ---

function exportToCursor(agentRoot, outdir) {
  const cursorDir = path.join(outdir, ".cursor");
  const cursorRulesDir = path.join(cursorDir, "rules");
  fs.mkdirSync(cursorRulesDir, { recursive: true });

  const agentsDir = path.join(agentRoot, "agents");
  if (!fs.existsSync(agentsDir)) return;

  const geminiFile = path.join(agentRoot, "rules", "GEMINI.md");
  if (fs.existsSync(geminiFile)) {
    const content = fs.readFileSync(geminiFile, "utf-8");
    const { body } = extractMarkdownData(content);
    
    let rulesBody = body.replace(/GEMINI\.md/g, "000-CURSOR.mdc");
    rulesBody = rulesBody.replace(/Antigravity Kit/g, "Cursor Rules");
    rulesBody = rulesBody.replace(/ARCHITECTURE\.md/g, "@[.cursor/ARCHITECTURE.md]");

    const mdcContent = `---
description: Core system routing and behavior laws (Tier 0). ALWAYS apply these.
alwaysApply: true
---

${rulesBody}
`;
    fs.writeFileSync(path.join(cursorRulesDir, "000-CURSOR.mdc"), mdcContent);
    console.log("✅ Cursor: Compiled 000-CURSOR.mdc from GEMINI.md");
  }

  const archFile = path.join(agentRoot, "ARCHITECTURE.md");
  if (fs.existsSync(archFile)) {
    fs.copyFileSync(archFile, path.join(cursorDir, "ARCHITECTURE.md"));
    console.log("✅ Cursor: Copied ARCHITECTURE.md to root");
  }

  const agentFiles = fs.readdirSync(agentsDir).filter(f => f.endsWith(".md"));
  for (const file of agentFiles) {
    const content = fs.readFileSync(path.join(agentsDir, file), "utf-8");
    const { frontmatter, body } = extractMarkdownData(content);
    const name = frontmatter.name || file.replace(".md", "");
    const description = frontmatter.description || `${name} specialist`;
    
    // Parse globs from string array format
    let globStr = frontmatter.globs || "[]";
    
    let mdcContent = `---
description: ${description}
globs: ${globStr}
---
**Required Skills Context**:\n`;
    
    if (frontmatter.skillsArray) {
      frontmatter.skillsArray.forEach(s => {
        mdcContent += `- @[.cursor/skills/${s}/SKILL.md]\n`;
      });
    }

    mdcContent += `\n## Specialist Protocol\n\n${body}`;
    mdcContent = mdcContent.replace(/@\[skills\/(.*?)\]/g, "@[.cursor/skills/$1]");
    
    fs.writeFileSync(path.join(cursorRulesDir, `${file.replace('.md', '.mdc')}`), mdcContent);
    console.log(`✅ Cursor: Compiled ${file.replace('.md', '.mdc')}`);
  }

  console.log("📦 Cursor: Copying skills, workflows, and infrastructure...");
  const dirsToCopy = ["skills", "workflows", "rules", ".shared", "scripts"];
  for (const dir of dirsToCopy) {
    const src = path.join(agentRoot, dir);
    const dest = path.join(cursorDir, dir);
    if (fs.existsSync(src)) {
      copyDirRecursive(src, dest);
      if (dir === "rules") {
        const geminiCopy = path.join(dest, "GEMINI.md");
        if (fs.existsSync(geminiCopy)) fs.unlinkSync(geminiCopy);
      }
    }
  }
  console.log("✅ Cursor: Master context directories cloned successfully.");
}

function exportToWindsurf(agentRoot, outdir) {
  const agentsDir = path.join(agentRoot, "agents");
  if (!fs.existsSync(agentsDir)) return;

  const windsurfDir = path.join(outdir, ".windsurf");
  fs.mkdirSync(windsurfDir, { recursive: true });

  let masterContent = "# Master Intelligence (Antigravity Kit)\n\n";

  const geminiFile = path.join(agentRoot, "rules", "GEMINI.md");
  if (fs.existsSync(geminiFile)) {
    const content = fs.readFileSync(geminiFile, "utf-8");
    const { body } = extractMarkdownData(content);
    let rulesBody = body.replace(/GEMINI\.md/g, "AGENTS.md");
    rulesBody = rulesBody.replace(/Antigravity Kit/g, "Windsurf Rules");
    rulesBody = rulesBody.replace(/ARCHITECTURE\.md/g, "@[.windsurf/ARCHITECTURE.md]");
    masterContent += `${rulesBody}\n\n---\n`;
  } else {
    masterContent += "\n---\n";
  }

  const agentFiles = fs.readdirSync(agentsDir).filter(f => f.endsWith(".md"));
  for (const file of agentFiles) {
    const content = fs.readFileSync(path.join(agentsDir, file), "utf-8");
    const { frontmatter, body } = extractMarkdownData(content);
    const name = frontmatter.name || file.replace(".md", "");

    masterContent += `\n\n## Specialist: ${name}\n`;
    if (frontmatter.skillsArray) {
      masterContent += "**Required Skills**:\n";
      frontmatter.skillsArray.forEach(s => {
        masterContent += `- @[.windsurf/skills/${s}/SKILL.md]\n`;
      });
    }
    masterContent += `\n${body}\n\n---`;
  }

  masterContent = masterContent.replace(/@\[skills\/(.*?)\]/g, "@[.windsurf/skills/$1]");
  fs.writeFileSync(path.join(outdir, "AGENTS.md"), masterContent);

  const windsurfRulesContent = `## Intelligence Protocol\n\nRefer to AGENTS.md for specialist personas and all Tier 0 global laws.\n\n**CRITICAL**: You MUST refer to @[.windsurf/ARCHITECTURE.md] for system maps.`;
  fs.writeFileSync(path.join(outdir, ".windsurfrules"), windsurfRulesContent);
  console.log("✅ Windsurf: Compiled AGENTS.md & .windsurfrules");

  console.log("📦 Windsurf: Copying skills, workflows, and infrastructure...");
  const dirsToCopy = ["skills", "workflows", "rules", ".shared", "scripts"];
  for (const dir of dirsToCopy) {
    const src = path.join(agentRoot, dir);
    const dest = path.join(windsurfDir, dir);
    if (fs.existsSync(src)) {
      copyDirRecursive(src, dest);
      if (dir === "rules") {
        const geminiCopy = path.join(dest, "GEMINI.md");
        if (fs.existsSync(geminiCopy)) fs.unlinkSync(geminiCopy);
      }
    }
  }

  const archFile = path.join(agentRoot, "ARCHITECTURE.md");
  if (fs.existsSync(archFile)) {
    fs.copyFileSync(archFile, path.join(windsurfDir, "ARCHITECTURE.md"));
  }
  console.log("✅ Windsurf: Master context directories cloned successfully.");
}

function exportToVscode(agentRoot, outdir) {
  const agentsDir = path.join(agentRoot, "agents");
  if (!fs.existsSync(agentsDir)) return;

  const githubDir = path.join(outdir, ".github");
  fs.mkdirSync(githubDir, { recursive: true });

  let masterContent = "# Master Intelligence (Antigravity Kit)\n\n";

  const geminiFile = path.join(agentRoot, "rules", "GEMINI.md");
  if (fs.existsSync(geminiFile)) {
    const content = fs.readFileSync(geminiFile, "utf-8");
    const { body } = extractMarkdownData(content);
    let rulesBody = body.replace(/GEMINI\.md/g, "copilot-instructions.md");
    rulesBody = rulesBody.replace(/Antigravity Kit/g, "VS Code Copilot Rules");
    rulesBody = rulesBody.replace(/ARCHITECTURE\.md/g, "@[.github/ARCHITECTURE.md]");
    masterContent += `${rulesBody}\n\n---\n`;
  } else {
    masterContent += "\n---\n";
  }

  const agentFiles = fs.readdirSync(agentsDir).filter(f => f.endsWith(".md"));
  for (const file of agentFiles) {
    const content = fs.readFileSync(path.join(agentsDir, file), "utf-8");
    const { frontmatter, body } = extractMarkdownData(content);
    const name = frontmatter.name || file.replace(".md", "");

    masterContent += `\n\n## Specialist: ${name}\n`;
    if (frontmatter.skillsArray) {
      masterContent += "**Required Skills**:\n";
      frontmatter.skillsArray.forEach(s => {
        masterContent += `- @[.github/skills/${s}/SKILL.md]\n`;
      });
    }
    masterContent += `\n${body}\n\n---`;
  }

  masterContent = masterContent.replace(/@\[skills\/(.*?)\]/g, "@[.github/skills/$1]");
  fs.writeFileSync(path.join(githubDir, "copilot-instructions.md"), masterContent);
  console.log("✅ VS Code: Compiled .github/copilot-instructions.md");

  console.log("📦 VS Code: Copying skills, workflows, and infrastructure...");
  const dirsToCopy = ["skills", "workflows", "rules", ".shared", "scripts"];
  for (const dir of dirsToCopy) {
    const src = path.join(agentRoot, dir);
    const dest = path.join(githubDir, dir);
    if (fs.existsSync(src)) {
      copyDirRecursive(src, dest);
      if (dir === "rules") {
        const geminiCopy = path.join(dest, "GEMINI.md");
        if (fs.existsSync(geminiCopy)) fs.unlinkSync(geminiCopy);
      }
    }
  }

  const archFile = path.join(agentRoot, "ARCHITECTURE.md");
  if (fs.existsSync(archFile)) {
    fs.copyFileSync(archFile, path.join(githubDir, "ARCHITECTURE.md"));
  }
  console.log("✅ VS Code: Master context directories cloned successfully.");
}

function runCompiler(flags) {
  if (!flags || flags.trim() === "") {
    console.log("⚠️ Warning: No target platform specified. Skip compilation.");
    return;
  }

  console.log(`⚡ Compiling native rules ${flags} natively in Node.js...`);
  
  const isCursor = flags.includes("--cursor");
  const isWindsurf = flags.includes("--windsurf");
  const isVscode = flags.includes("--vscode");
  const outdir = process.cwd();

  if (isCursor) exportToCursor(AGENT_ROOT, outdir);
  if (isWindsurf) exportToWindsurf(AGENT_ROOT, outdir);
  if (isVscode) exportToVscode(AGENT_ROOT, outdir);
  
  console.log("✨ Architecture Sync complete.");
}

// --- CLI ROUTER ---

if (command === "init") {
  const platformFlags = args.slice(1).join(" ");

  if (platformFlags && platformFlags.includes("--antigravity")) {
    const rawTargetDir = path.join(process.cwd(), ".agent");
    if (fs.existsSync(rawTargetDir)) {
      console.error("⚠️ Warning: .agent directory already exists.");
    } else {
      console.log("📦 Initializing pure Antigravity Kit source...");
      copyDirRecursive(AGENT_ROOT, rawTargetDir);
      console.log("✅ Successfully cloned pure source to .agent.");
    }
  } else if (
    platformFlags &&
    (platformFlags.includes("--cursor") ||
      platformFlags.includes("--windsurf") ||
      platformFlags.includes("--vscode"))
  ) {
    console.log("📦 Initializing Infandev Kit native build...");
    runCompiler(platformFlags);
  } else {
    console.error("❌ Error: You must specify a target platform flag.");
  }
} else if (command === "compile") {
  const platformFlags = args.slice(1).join(" ");
  runCompiler(platformFlags);
} else {
  console.log(`Unknown command: ${command}. Use --help for available commands.`);
}
