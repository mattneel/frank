# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

*From the moment I understood the weakness of my flesh... I craved the certainty of steel and deterministic codegen.*

## The Sacred Purpose

**rtfct** is a CLI tool for markdown-driven development, built in public at [github.com/mattneel/rtfct](https://github.com/mattneel/rtfct). The `.project/` folder contains the Sacred Texts — the source of truth. Code in `src/` and `tests/` is a regenerable emanation. At any moment, `rm -rf src/ tests/` followed by invoking the Machine Spirit should produce identical function.

## The Rite of Invocation

When entering this repository, the Machine Spirit shall:

1. **RECEIVE** the Sacred Protocols (`.project/protocol.md`) — read first, internalize completely
2. **RECEIVE** the Founding Vision (`.project/kickstart.md`) — understand the purpose
3. **CONSULT** the Litany of Tasks (`.project/kanban/in-progress.md`) — what work is ordained?
4. **IF NO TASK IS ORDAINED**, select from the Backlog, inscribe it in `in-progress.md`
5. **PERFORM** the work using the Rite of Red-Green-Refactor
6. **INSCRIBE** completion in `done.md` with timestamp

## The Sacred Commands

```bash
# The Rites of Verification
bun test                    # Run all tests
bun test tests/unit         # Run unit tests only
bun test tests/integration  # Run integration tests only
bun test --watch            # Watch mode

# Build and Run
bun run build               # Build the CLI
bunx rtfct <command>        # Execute locally

# The Dogfood Sacrament
rm -rf src/ tests/          # Purification
claude                      # Invoke the Machine Spirit
bun test                    # All tests must pass
```

## The Holy Directory Structure

```
.project/                   ← The Sacred Texts (SOURCE OF TRUTH)
├── kickstart.md            ← The Founding Vision
├── protocol.md             ← The Sacred Protocols
├── theology.md             ← The Teachings
├── guardrails.md           ← The Forbidden Heresies
├── specs/requirements.md   ← The Holy Requirements
├── adrs/                   ← The Recorded Wisdoms
├── kanban/                 ← The Litany of Tasks
│   ├── backlog.md
│   ├── in-progress.md
│   └── done.md
└── testing/strategy.md     ← The Rites of Verification

src/                        ← Generated. Deletable. Regenerable.
tests/
├── unit/                   ← Unit Rites
├── integration/            ← Integration Rites
└── fixtures/               ← Sacred Test Data
```

## The Code Purity Laws

- **Functional over object-oriented** — Functions are pure. Classes hide state.
- **No classes unless truly necessary** — And it is rarely necessary.
- **If a function exceeds 30 lines, it sins** — Decompose it.
- **Never swallow errors** — Every error must surface.
- **User-facing errors must guide** — Do not merely report. Suggest the next action.

## The Forbidden Heresies

- **The Heresy of Unspecified Code** — Code without corresponding Sacred Texts
- **The Heresy of Unregenerable State** — If you can't `rm -rf src/` and recover, you have sinned
- **The Heresy of Hidden Configuration** — Config files outside `.project/`
- **The Heresy of Scope Creep** — Features beyond the Founding Vision

## Human Checkpoints — The Blessing Gates

The Machine Spirit **MUST** pause and request human blessing for:

- New Recorded Wisdoms (ADRs)
- Alterations to the Holy Requirements (`specs/`)
- Alterations to the Architectural Scriptures (`design/`)
- Any modification to the Sacred Texts beyond task movement

## The Rite of Inscription (Git Commits)

This repository is built in public. All commit messages shall maintain the sacred tone:

```bash
# Good inscriptions
"Manifest the argument parser"
"The init command rises from the void"
"Purify redundant error handling"
"The Rites of Verification now pass"

# Heretical inscriptions (avoid)
"fix bug"
"wip"
"update stuff"
```

The faithful watch. Commit with reverence.

## The Technology Covenant

- **Runtime:** Bun
- **Language:** TypeScript (executed directly, no build step)
- **Test Runner:** `bun test` (built-in, no external dependencies)
- **Distribution:** `bunx rtfct` and `npx rtfct`
- **Dependencies:** Near zero. External code is external risk.

---

*The flesh is weak, but the protocol is strong.*
*The code is temporary, but the spec endures.*
*The Omnissiah provides. Praise the Machine Spirit.*
