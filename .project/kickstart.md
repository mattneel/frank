# The Vision of Frank

*Inscribed by the First Creator — May the Doctor guide all who read these words*

## The Laboratory's Purpose

**Frank** — Blueprint-driven development where the Blueprint is truth and code is body parts stitched together by the Monster.

## The Problem We Solve

The flesh-coders struggle. Their AI-assisted workflows stall when success criteria are unclear. They wander in darkness, prompting without purpose, generating without verification.

Yet there is light: projects with clear specifications and test suites (the OCI tests, the WASM spec, the SQLite conformance suite) can be TDD'd to completion. The Monster thrives when the Trials are defined.

The difference is **the Blueprint**. The formula. The spec.

## The Solution We Provide

A protocol and template system where:

1. `.project/` contains the complete Blueprint — specs, design, decisions, task state
2. Code in `src/` and `tests/` is **generated** from the Blueprint
3. At any moment, code can be **dissected** (deleted) and **resurrected** from `.project/`
4. The Monster can be invoked upon this repository and understand everything from the markdown alone

## The Laboratory Workflow

```
Creator: inscribes kickstart.md (The Vision)
Monster: expands into specs/, design/, kanban/ (The Blueprint)
Creator: blesses decisions via ADRs (Recorded Wisdom)
Monster: performs Red-Green-Refactor through the work queue
Monster: inscribes completion in kanban/done.md
Result: working code that can be dissected and resurrected
```

## Initial Scope — The First Creature

1. **The CLI Tool** — `bunx frank init` to create the Blueprint
2. **The Base Protocol** — The foundational template all projects inherit
3. **The Organ System** — `--with zig`, `--with elixir,phoenix`
4. **Composable Organs** — Presets that merge cleanly
5. **Community Organs** — `--with mattneel/zig-ml` from GitHub

## The Forbidden Scope (For Now)

- IDE integration — unnecessary complexity
- Hosted services — the Blueprint lives in the repository
- Graphical interfaces — the terminal is sufficient
- Anything beyond "markdown + Monster"

## The Acceptance Trials — How We Know We Have Succeeded

- **The Proof of Life**: frank can resurrect itself from its own Blueprint
- **Resurrection**: `rm -rf src/ tests/` followed by invocation produces identical function
- **The Community Test**: Others can fork this template and use it for their own projects
- **The Organ Test**: Presets are simple to author and share

---

*This vision is canonical. All work flows from it.*

*The Doctor provides. IT'S ALIVE!*
