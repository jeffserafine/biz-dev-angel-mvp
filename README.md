# Biz Dev Angel OS (MVP)

Experimental MVP for Biz Dev Angel.

Deal-centric executive business development operating system.
Human-in-the-loop. No funnels. No CRM.

## Canonical Spec
See: prompts/BizDevAngel_MasterPrompt_v1.md
Refactor brief: prompts/BDA_Refactor_Brief_v1.md

## v0.3 Architecture

Four active modules plus a gated practitioner suite:

- **Dashboard (Today)** — executive command center; surfaces top Core Engine signals.
- **ICP Forge** — guided session module producing structured ICP deliverables.
- **Narrative Engine** — positioning + pitch variant deliverables, optionally linked to an ICP.
- **DealMap** — deals as the atomic unit; Core Engine signals and next-best-actions surfaced inline.
- **BDA Pro** *(gated, Coming Soon)* — full practitioner suite. `HandshakeSession` type is scaffolded for the agent-to-agent deal workflow that ships with Pro.

The **Core Engine** (`app/lib/coreEngine.ts`) is the methodology service layer.
It computes momentum, surfaces signals, and resolves the next-best-action for each deal.
It is the methodology moat made visible in code.

## Repo structure
- prompts/  canonical spec + prompts
- builds/   agent-specific outputs
- app/      current working build
- notes/    iteration log and decisions
