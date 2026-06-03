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

### For VS Code Developers (Copilot / Cline / RooCode)

Generates a unified `.github/copilot-instructions.md` configuration natively enforcing Tier 0 globals alongside your architecture.

```bash
npx @infandev/agent-kit init --vscode
```

### For Antigravity

Initializes the `.agent` folder containing the pure source context for tools like Aider or RooCode.

```bash
npx @infandev/agent-kit init --antigravity
```

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

MIT © 2026 [Infantex Team](https://github.com/infantex-team)
