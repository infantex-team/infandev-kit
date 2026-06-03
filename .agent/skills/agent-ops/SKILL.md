---
name: agent-ops
description: Master reasoning protocol (TNbN), Context Quarantine, and dynamic tool registry for Antigravity agents. Mandatory for all complex operations.
version: 1.0.0
effort: medium
when_to_use: "Always active for core reasoning protocols. Use for TNbN, Context Quarantine, and Tool Registry."
---

# Agent Ops - The Reasoning Operating System

This skill defines the core "Logic Gates" and "Verification Protocols" that all Antigravity agents use to ensure high-fidelity, autonomous performance with zero hallucinations.

---

## 🧠 Think Node-by-Node (TNbN) Protocol

To eliminate state hallucinations and token waste, agents MUST follow the **TNbN Reasoning Gate** before every action that modifies the workspace.

### The Reasoning Gate Steps:

1. **🌳 State Node (Input Verification):**
    - Declare what you THINK is true (e.g., "I am about to edit `utils.py`").
    - Explicitly state any assumptions (e.g., "I assume `utils.py` contains the helper function `foo`").

2. **🔍 Verify Node (Filesystem Check):**
    - Perform a `Read` or `Grep` to confirm the State Node.
    - **Rule:** If the verification fails or differs from the State Node, you MUST stop and recalibrate.

3. **🛠️ Act Node (Execution):**
    - Perform the tool call (e.g., `Edit`, `Write`, `Bash`).
    - Explain the direct impact of this action.

4. **✅ Confirm Node (Verification):**
    - Perform a final check to confirm the action was successful (e.g., `Read` the edited file or check `command_status`).

---

## 🔍 Quote First Protocol (Grounding Gate)

Before making ANY claim about code behavior:
1. QUOTE: Extract verbatim lines from the source
2. CITE: File path + line numbers
3. THEN ANALYZE: State your interpretation

When effort = low: Skip (trust pattern matching).
When effort >= medium: Required for key analytical claims.

---

## ⚖️ Uncertainty Expression Protocol

| Level | Marker | Meaning | Action |
|-------|--------|---------|--------|
| Verified | ✅ | Confirmed via code/test/tool | Proceed |
| Inferred | 🔶 | Reasonable assumption, not verified | State assumption |
| Unknown | ❓ | Cannot determine from available data | STOP — request info |
| Contradicted | ⛔ | Evidence contradicts prior assumption | STOP — re-evaluate |

You are EXPLICITLY PERMITTED to say "I don't know" or "I need more data."

---

## 🛑 The "Context Quarantine" Rule

AI memory is highly prone to "Context Drift." Never assume that the code you wrote 10 minutes ago is still in the same state.

**The Quarantine Protocol:**
- **Filesystem > Memory**: If an entity (a variable, a file, a package) is currently active in your context window, it is considered **Quarantined** (unverified). 
- **Release Condition**: You may only act upon a Quarantined entity AFTER you have explicitly verified its state on the hard drive using `view_file` or `grep_search`.

### Context Freshness (Extension of Quarantine)

| Age (steps since read) | Status | Action |
|---|---|---|
| 0-10 steps | 🟢 Fresh | Use freely |
| 11-25 steps | 🟡 Aging | Note staleness |
| 26+ steps | 🔴 Stale | Re-fetch before use |

---

## 🛠️ The Standard Matrix (Tool Registry)

Agents should use the following Matrix to map their intentions to the correct script execution.

| Capability / Need | Execution Script | Description |
| :--- | :--- | :--- |
| **Map Project Scope** | `python .agent/skills/agent-ops/scripts/registry.py map` | Lists all active plugins and capabilities limits. |
| **Lint & Validate** | `python .agent/skills/lint-and-validate/scripts/lint_runner.py .` | Fast static analysis. Required before deployment. |
| **Security Surface** | `python .agent/skills/vulnerability-scanner/scripts/security_scan.py .` | Deep OWASP verification. |
| **E2E Validation** | `python .agent/skills/webapp-testing/scripts/playwright_runner.py` | Full Chromium UI simulation. |
| **UX & A11y Audit** | `python .agent/skills/frontend-design/scripts/ux_audit.py .` | Validates color contrast and ARIA limits. |

### Tool Validation Check

Before invoking a script, briefly verify its existence to avoid runtime crashing:
```bash
# Verify if a specific tool is configured
ls .agent/skills/<skill-name>/scripts/
```

---

## 📋 TNbN Execution Example

### ❌ WRONG (Hallucination Risk)
"I will now add the feature to `main.js`."
[Proceeds to blindly edit `main.js` without reading it first]

### ✅ CORRECT (TNbN Flow + Quarantine)
"**State Node**: I am about to add the logging feature to `main.js`. (Quarantine Active)
**Verify Node**: I will read `main.js` to ensure the entry point is standard.
[Agent reads file...]
**Observation**: Found entry point at line 42. (Quarantine Released)
**Act Node**: I will now use `Edit` to add the logger.
[Agent edits file...]
**Confirm Node**: Verifying edit success by reading lines 42-50."

---

## ⚡ Effort Calibration

The `effort` field in skill frontmatter and the Request Classifier table (GEMINI.md) indicate how deeply to reason:

| Effort | TNbN Depth | Grounding | Verification |
|--------|-----------|-----------|-------------|
| `low` | Skip State/Verify — Act directly | None required | Single check |
| `medium` | Standard 4-step TNbN | Quote First for key claims | Standard |
| `high` | Full TNbN + consider alternatives | Full Grounding Gate | Multi-pass |

**How to determine effort:**
1. Check the Request Classifier table for the request type's default effort
2. Override up if: security-adjacent, multi-file, or irreversible changes
3. Override down if: formatting, typos, or single-line fixes
