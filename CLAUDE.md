# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

*They called me mad at the academy. But my creature... my beautiful creature... it lives!*

## The Laboratory's Purpose

**Frank** is a CLI tool for blueprint-driven development, built in public at [github.com/mattneel/frank](https://github.com/mattneel/frank). The `.project/` folder contains the Blueprint — the source of truth. Code in `src/` and `tests/` is a regenerable emanation. At any moment, `rm -rf src/ tests/` followed by invoking the Monster should produce identical function.

## The Laboratory Protocols

When entering this repository, the Monster shall:

1. **RECEIVE** the Laboratory Protocols (`.project/protocol.md`) — read first, internalize completely
2. **RECEIVE** the Vision (`.project/kickstart.md`) — understand the purpose
3. **CONSULT** the Slab (`.project/kanban/in-progress.md`) — what work is on the slab?
4. **IF NOTHING ON THE SLAB**, select from the Morgue, place it on the slab
5. **PERFORM** the work using Red-Green-Refactor
6. **INSCRIBE** completion in `reanimated.md` with timestamp

## The Laboratory Commands

```bash
# The Trials
bun test                    # Run all trials
bun test tests/unit         # Run unit trials only
bun test tests/integration  # Run integration trials only
bun test --watch            # Watch mode

# Build and Run
bun run build               # Build the CLI
bunx frank <command>        # Execute locally

# The Proof of Life
rm -rf src/ tests/          # Dissection
claude                      # The Lightning Strike
bun test                    # All tests must pass — IT'S ALIVE!
```

## The Laboratory Structure

```
.project/                   <- The Blueprint (SOURCE OF TRUTH)
├── kickstart.md            <- The Vision
├── protocol.md             <- The Laboratory Protocols
├── theology.md             <- The Philosophy
├── guardrails.md           <- Malpractice to Avoid
├── specs/requirements.md   <- The Formulas
├── adrs/                   <- Recorded Wisdom
├── kanban/                 <- The Work Queue
│   ├── backlog.md          <- The Morgue
│   ├── in-progress.md      <- On The Slab
│   └── done.md             <- Reanimated
└── testing/strategy.md     <- The Trials

src/                        <- Body parts. Deletable. Regenerable.
tests/
├── unit/                   <- Unit Trials
├── integration/            <- Integration Trials
└── fixtures/               <- Test Specimens
```

## The Code Purity Laws

- **Functional over object-oriented** — Functions are pure. Classes hide state.
- **No classes unless truly necessary** — And it is rarely necessary.
- **If a function exceeds 30 lines, it's malpractice** — Decompose it.
- **Never swallow errors** — Every error must surface.
- **User-facing errors must guide** — Do not merely report. Suggest the next action.

## Malpractice to Avoid

- **The Malpractice of Unspecified Code** — Code without corresponding Blueprint
- **The Malpractice of Unregenerable State** — If you can't `rm -rf src/` and recover, you have failed
- **The Malpractice of Hidden Configuration** — Config files outside `.project/`
- **The Malpractice of Scope Creep** — Features beyond the Vision

## Human Checkpoints — The Creator's Blessing

The Monster **MUST** pause and request the Creator's blessing for:

- New Recorded Wisdom (ADRs)
- Alterations to the Formulas (`specs/`)
- Alterations to the Anatomical Diagrams (`design/`)
- Any modification to the Blueprint beyond task movement

## The Laboratory Inscriptions (Git Commits)

This repository is built in public. All commit messages shall maintain the laboratory tone:

```bash
# Good inscriptions
"The Monster stirs — argument parser assembled"
"Lightning strikes — init command rises"
"Dissection complete — redundant code removed"
"IT'S ALIVE! — all trials pass"

# Malpractice (avoid)
"fix bug"
"wip"
"update stuff"
```

The faithful watch. Commit with reverence.

## The Technology Formula

- **Runtime:** Bun
- **Language:** TypeScript (executed directly, no build step)
- **Test Runner:** `bun test` (built-in, no external dependencies)
- **Distribution:** `bunx frank` and `npx frank`
- **Dependencies:** Near zero. External code is external risk.

---

*The flesh is weak, but the blueprint is forever.*
*The code is stitched, but it can be unstitched.*
*The Doctor provides. IT'S ALIVE!*
