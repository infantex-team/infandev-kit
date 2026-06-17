# ⚙️ @infandev/agent-kit

[![npm version](https://img.shields.io/npm/v/@infandev/agent-kit.svg?style=flat-square)](https://www.npmjs.com/package/@infandev/agent-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

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

Initializes the `.agents` folder containing the pure source context for tools like Aider or RooCode.

```bash
npx @infandev/agent-kit init --antigravity
```

---

---

## 🆚 Why Infandev Agent Kit? (Vanilla AI vs Enterprise AI)

| Feature | Vanilla LLM / Default IDE | Infandev Kit (v2.0) |
| :--- | :--- | :--- |
| **Hallucination Risk** | High (Blind assumptions) | **Zero** (TNbN + Grounding Gates) |
| **Context Window** | Overloaded (All rules always on) | **Efficient** (Progressive Disclosure) |
| **Strategic Alignment** | Drifts easily | **Locked in** (Top-down Intent System) |
| **Reasoning Depth** | Static (Tries to over-architect typos) | **Dynamic** (Scales based on Effort) |
| **Confidence** | Confidently wrong | **Honest** (Explicit Uncertainty Protocol) |

---

## ⚡ The Architecture (v2.0 Enterprise Edition)

**Infandev Kit** acts as the intelligence layer for AI-native development by standardizing agentic reasoning across platforms. With the v2.0 Enterprise upgrade, the kit now scales reasoning depth, guarantees strategic alignment, and strictly prevents hallucinations.

### 🎯 Intent System (New in v2.0)
The kit now implements top-down **Intent Engineering**. A global `project-intent.md` defines your project's non-negotiable trade-offs, which are dynamically loaded by all 20 specialized agent profiles. When you pivot strategy, the entire AI workforce adapts instantly.

### ⚖️ Effort Calibration (New in v2.0)
Not every task requires deep architectural planning. The kit now maps the `effort` (low/medium/high) of your request to the required analytical depth. Typo fixes get immediate execution; system architecture gets multi-pass verification.

### 🧠 TNbN Protocol + Grounding Gates (Zero Hallucination)
This package forces the LLM to follow a strict Node-based operational pipeline, saving thousands of tokens. In v2.0, this is reinforced by new **Grounding Gates**:

1.  **🌳 State Node**: Declare the target and assumptions before calculating.
2.  **🔍 Verify Node**: Use raw filesystem tools to confirm the actual landscape.
3.  **🛡️ Grounding Gate**: *Quote* verbatim code lines before making analytical claims. Express explicit *Uncertainty* (`❓`, `🔶`) instead of guessing.
4.  **🛠️ Act Node**: Perform the exact atomic modification required.
5.  **✅ Confirm Node**: Verify the execution with a final tool validation, respecting *Context Freshness* tags to prevent drift.

### 📦 Progressive Disclosure
Unlike default IDE setups that overwhelm the AI with rule vomit, `@infandev/agent-kit` dynamically connects targeted Agent glob triggers to deep Skill modules (`@[.cursor/skills/...]`). As your AI reads a database schema, it actively pulls the `database-architect` context.

---

## 🛠️ Configuration Guide (v2.0 Features)

### 1. Setting Your Project Intent
After initializing the kit, define your project's non-negotiable trade-offs to align your entire AI workforce.

1. Open `.agents/.shared/project-intent.md`
2. Modify the **Primary Mandate** and **Trade-off Resolution** sections.
3. Every specialized agent (Frontend, Backend, etc.) will automatically read and adhere to this strategy on every invocation.

### 2. Effort Calibration
The kit automatically maps your requests to the optimal reasoning depth.
* **Low Effort**: (e.g. `Fix typo`) → Immediate execution. No planning overhead.
* **Medium Effort**: (e.g. `Refactor component`) → Standard TNbN + Code Quoting.
* **High Effort**: (e.g. `Build new feature`) → Full Grounding Gates, multi-pass verification.

---

MIT © 2026 [Infantex Team](https://github.com/infantex-team)
