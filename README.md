# ⚙️ @infandev/agent-kit

## 🚀 Installation

Install and compile the AI context engine directly into your workspace with a single command. **You must specify your IDE target.**

### For Cursor Developers

Generates native `.cursor/rules/*.mdc` files and securely connects Master Context modules (skills & workflows).

```bash
npx @infandev/agent-kit init --cursor
```

### For Windsurf Developers

Compiles the `AGENTS.md` unified persona matrix and initializes `.windsurfrules`.

```bash
npx @infandev/agent-kit init --windsurf
```

### For Raw CLI / Custom Setups

If you use CLI agents like Aider, RooCode, or purely Claude Code, extract the raw uncompiled intelligence matrix directly into an `.antigravity/` folder:

```bash
npx @infandev/agent-kit init --antigravity
```

> **Direct Cache Complier**: When using IDE flags, the core `.agent/` factory engine stays inside the hidden `npx` cache. Your codebase remains perfectly clean and only receives the finalized native IDE formats.

---

## ⚡ The Architecture

**Infandev Kit** acts as the intelligence layer for AI-native development by standardizing agentic reasoning across platforms through the **Think Node-by-Node (TNbN)** protocol.

### 🧠 TNbN Protocol (Zero Hallucination)

This package forces the LLM to follow a strict Node-based operational pipeline, saving thousands of tokens:

1.  **🌳 State Node**: Declare the target and assumptions before calculating.
2.  **🔍 Verify Node**: Use raw filesystem tools (`ls`, `cat`, etc.) to confirm the actual landscape.
3.  **🛠️ Act Node**: Perform the exact atomic modification required.
4.  **✅ Confirm Node**: Verify the execution with a final tool validation.

### 📦 Progressive Disclosure

Unlike default IDE setups that overwhelm the AI with rule vomit, `@infandev/agent-kit` dynamically connects targeted Agent glob triggers to deep Skill modules (`@[.cursor/skills/...]`). As your AI reads a database schema, it actively pulls the `database-architect` context.

---

## 🛠️ CLI Reference

### Re-Compile & Update

If we release updates to the Master AI Rules, simply run the compile command again in your project root to sync your IDE rules perfectly:

```bash
npx @infandev/agent-kit compile --cursor
# or
npx @infandev/agent-kit compile --windsurf
```

---

MIT © 2026 [Infantex AI](https://github.com/infantex)
