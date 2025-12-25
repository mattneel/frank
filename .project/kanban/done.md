# Done — Completed Works

*Here we record the manifestations of the Machine Spirit. Each completed task is a victory.*

---

## [TASK-001] Consecrate the Project Scaffolding

**Completed:** 2025-12-25

The foundation has been laid:
- `package.json` with CLI bin entry and sacred scripts
- `tsconfig.json` with strict TypeScript configuration
- `src/index.ts` entry point awaiting the sacred commands
- `tests/` directory structure prepared for the Rites of Verification

The Acceptance Rite passes: `bun run build` completes without error.

*Praise the Machine Spirit.*

---

## [TASK-002] Manifest the Argument Parser

**Completed:** 2025-12-25

The sacred commands have been ordained:
- `src/args.ts` — parses commands, flags, and arguments
- `src/help.ts` — displays guidance to the Tech-Priest
- Full test coverage in `tests/unit/args.test.ts`

The Acceptance Rite passes:
- `rtfct --help` displays sacred usage
- Unknown commands produce clear error with guidance

*Praise the Machine Spirit.*

---

## [TASK-003] Manifest the `init` Command — Basic

**Completed:** 2025-12-25

The consecration ritual has been manifested:
- `src/commands/init.ts` — creates the .project/ structure
- `src/templates.ts` — contains the Sacred Text templates
- Full integration test coverage in `tests/integration/init.test.ts`

The Acceptance Rite passes:
- `rtfct init` creates valid .project/ structure with all Sacred Texts
- `--force` purifies and recreates existing .project/
- Fails gracefully if .project/ already exists

*Praise the Machine Spirit.*

---

## [TASK-004] Manifest the `init` Command — With Presets

**Completed:** 2025-12-25

The Codex incorporation mechanism has been manifested:
- `src/presets/index.ts` — resolves and writes preset files
- `src/presets/zig.ts` — The Zig Codex with testing strategy and guardrails
- `src/presets/typescript.ts` — The TypeScript Codex with testing strategy and guardrails

The Acceptance Rite passes:
- `rtfct init --with zig` creates project with Zig Codex properly merged
- `rtfct init --with zig,typescript` handles multiple comma-separated presets
- Unknown presets fail gracefully with guidance

*Praise the Machine Spirit.*

---

## [TASK-010] Manifest the `status` Command

**Completed:** 2025-12-25

The Litany of Tasks is now revealed:
- `src/kanban.ts` — parses kanban markdown, counts tasks, extracts current task
- `src/commands/status.ts` — runs status command with formatted output

The Acceptance Rite passes:
- Shows backlog/in-progress/done counts
- Displays current ordained task with ID and title
- Shows last activity timestamp
- Sacred formatting with decorative borders

*Praise the Machine Spirit.*

---

## [TASK-013] Manifest the `praise` Command

**Completed:** 2025-12-25

The sacred easter egg has been manifested:
- `src/commands/praise.ts` — recites the Litany of Deterministic Codegen

The Acceptance Rite passes:
- `rtfct praise` outputs the Litany exactly as written in theology.md

*Praise the Machine Spirit.*

---

## [TASK-011] Manifest the `regenerate` Command

**Completed:** 2025-12-25

The Rite of Purification has been manifested:
- `src/manifest.ts` — reads preset manifests, collects generated_paths
- `src/commands/regenerate.ts` — purifies generated code paths

The Acceptance Rite passes:
- Prompts for confirmation without --yes flag
- Deletes only paths listed in preset manifests' `generated_paths`
- Preserves the Sacred Texts in .project/
- Uses default src/ and tests/ when no presets found

*Praise the Machine Spirit.*

---

## [TASK-009] Manifest the `add` Command

**Completed:** 2025-12-25

The Codex incorporation mechanism has been extended:
- `src/commands/add.ts` — adds presets to existing projects
- `src/presets/elixir.ts` — The Elixir Codex with OTP wisdom

The Acceptance Rite passes:
- `rtfct add elixir` incorporates Codex into existing project
- Fails gracefully if preset already incorporated
- Fails gracefully if .project/ does not exist

*Praise the Machine Spirit.*

---

## [TASK-012] The Dogfood Sacrament

**Completed:** 2025-12-25

The ultimate proof of the Sacred Texts. The code was purified and regenerated:
- Deleted `src/` and `tests/` completely
- Regenerated all source files from the Sacred Texts in `.project/`
- Regenerated all test files from the Rites of Verification specifications

The Acceptance Rite passes:
- All 110 Rites of Verification pass (`bun test`)
- CLI functions identically: init, add, status, regenerate, praise
- The Sacred Texts proved sufficient to recreate the tool

*From specification, code. From code, verification. From verification, truth.*

*Praise the Machine Spirit.*

---

## [TASK-005] Inscribe the Base Codex

**Completed:** 2025-12-25

The foundation has been laid for all projects:
- `src/presets/base.ts` — The Base Codex containing all Sacred Texts
- Refactored `init.ts` to use the Base Codex instead of templates.ts
- Removed obsolete `templates.ts` — the Base Codex is now the source of truth
- Base preset automatically installed to .project/presets/base/ for manifest tracking

The Acceptance Rite passes:
- Base Codex includes protocol.md, theology.md, kickstart.md, guardrails.md
- Base Codex includes kanban structure (backlog.md, in-progress.md, done.md)
- 113 Rites of Verification pass

*The foundation is eternal. Praise the Machine Spirit.*

---

## [TASK-006] Inscribe the Zig Codex

**Completed:** 2025-12-25

The Zig Codex has been enhanced for the faithful:
- `testing/strategy.md` — Comprehensive testing with `zig build test`, allocator testing, comptime testing
- `guardrails.md` — Memory heresies, allocator wisdom, comptime heresies, error handling
- `design/patterns.md` — build.zig patterns: minimal, library, dependencies, cross-compilation, C interop

The Acceptance Rite passes:
- Testing strategy includes `zig build test`
- Guardrails cover allocators and comptime
- Build.zig patterns documented
- 115 Rites of Verification pass

*The Zig faithful are guided. Praise the Machine Spirit.*

---
