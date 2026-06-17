---
name: parallel-agents
description: Multi-agent orchestration patterns. Use when multiple independent tasks can run with different domain expertise or when comprehensive analysis requires multiple perspectives.
when_to_use: "When a task requires 2+ specialist agents, comprehensive multi-domain analysis, or coordinated parallel execution. Use with /orchestrate or /coordinate workflows. NOT for single-domain tasks where one agent suffices."
allowed-tools: Read, Glob, Grep
effort: medium
---

# Native Parallel Agents

> Orchestration through AG Kit's built-in Agent Tool

## Overview

This skill enables coordinating multiple specialized agents through AG Kit's native agent system. Unlike external scripts, this approach keeps all orchestration within AG Kit's control.

## When to Use Orchestration

✅ **Good for:**
- Complex tasks requiring multiple expertise domains
- Code analysis from security, performance, and quality perspectives
- Comprehensive reviews (architecture + security + testing)
- Feature implementation needing backend + frontend + database work

❌ **Not for:**
- Simple, single-domain tasks
- Quick fixes or small changes
- Tasks where one agent suffices

---

## Native Agent Invocation

### Single Agent
```
Use the security-auditor agent to review authentication
```

### Sequential Chain
```
First, use the explorer-agent to discover project structure.
Then, use the backend-specialist to review API endpoints.
Finally, use the test-engineer to identify test gaps.
```

### With Context Passing
```
Use the frontend-specialist to analyze React components.
Based on those findings, have the test-engineer generate component tests.
```

### Resume Previous Work
```
Resume agent [agentId] and continue with additional requirements.
```

---

## Orchestration Patterns

### Pattern 1: Comprehensive Analysis
```
Agents: explorer-agent → [domain-agents] → synthesis

1. explorer-agent: Map codebase structure
2. security-auditor: Security posture
3. backend-specialist: API quality
4. frontend-specialist: UI/UX patterns
5. test-engineer: Test coverage
6. Synthesize all findings
```

### Pattern 2: Feature Review
```
Agents: affected-domain-agents → test-engineer

1. Identify affected domains (backend? frontend? both?)
2. Invoke relevant domain agents
3. test-engineer verifies changes
4. Synthesize recommendations
```

### Pattern 3: Security Audit
```
Agents: security-auditor → penetration-tester → synthesis

1. security-auditor: Configuration and code review
2. penetration-tester: Active vulnerability testing
3. Synthesize with prioritized remediation
```

## Available Agents

> See [ARCHITECTURE.md](file:///Users/daniel/Documents/Infantex/AI/infandev-kit/.agents/ARCHITECTURE.md#-agents-20) for full agent list.
> For advanced orchestration with parallel dispatch, fork semantics, and phase-based workflows, see `coordinator-mode` skill.

---

## Synthesis Protocol

After all agents complete, synthesize:

```markdown
## Orchestration Synthesis

### Task Summary
[What was accomplished]

### Agent Contributions
| Agent | Finding |
|-------|---------|
| security-auditor | Found X |
| backend-specialist | Identified Y |

### Consolidated Recommendations
1. **Critical**: [Issue from Agent A]
2. **Important**: [Issue from Agent B]
3. **Nice-to-have**: [Enhancement from Agent C]

### Action Items
- [ ] Fix critical security issue
- [ ] Refactor API endpoint
- [ ] Add missing tests
```

---

## Best Practices

1. **Logical order** — Discovery → Analysis → Implementation → Testing
2. **Share context** — Pass relevant findings to subsequent agents
3. **Single synthesis** — One unified report, not separate outputs
4. **Verify changes** — Always include test-engineer for code modifications
5. **Use coordinator-mode** — For complex multi-phase orchestration with parallel workers
