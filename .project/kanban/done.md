# Reanimated — Completed Works

*Here we record the Monster's work. Each completed task is a creature risen.*

---

## [TASK-001] Assemble the Project Scaffolding

**Completed:** 2025-12-25

The foundation has been laid:
- `package.json` with CLI bin entry and laboratory scripts
- `tsconfig.json` with strict TypeScript configuration
- `src/index.ts` entry point awaiting the laboratory commands
- `tests/` directory structure prepared for the Trials

The Acceptance Trial passes: `bun run build` completes without error.

*IT'S ALIVE!*

---

## [TASK-002] Stitch the Argument Parser

**Completed:** 2025-12-25

The laboratory commands have been assembled:
- `src/args.ts` — parses commands, flags, and arguments
- `src/help.ts` — displays guidance to the Creator
- Full test coverage in `tests/unit/args.test.ts`

The Acceptance Trial passes:
- `frank --help` displays laboratory usage
- Unknown commands produce clear error with guidance

*IT'S ALIVE!*

---

## [TASK-003] Stitch the `init` Command — Basic

**Completed:** 2025-12-25

The assembly ritual has been stitched:
- `src/commands/init.ts` — creates the .project/ structure
- `src/templates.ts` — contains the Blueprint templates
- Full integration test coverage in `tests/integration/init.test.ts`

The Acceptance Trial passes:
- `frank init` creates valid .project/ structure with all Blueprint files
- `--force` dissects and recreates existing .project/
- Fails gracefully if .project/ already exists

*IT'S ALIVE!*

---

## [TASK-004] Stitch the `init` Command — With Organs

**Completed:** 2025-12-25

The Organ grafting mechanism has been stitched:
- `src/presets/index.ts` — resolves and writes Organ files
- `src/presets/zig.ts` — The Zig Organ with testing strategy and guardrails
- `src/presets/typescript.ts` — The TypeScript Organ with testing strategy and guardrails

The Acceptance Trial passes:
- `frank init --with zig` creates project with Zig Organ properly merged
- `frank init --with zig,typescript` handles multiple comma-separated Organs
- Unknown Organs fail gracefully with guidance

*IT'S ALIVE!*

---

## [TASK-010] Stitch the `status` Command

**Completed:** 2025-12-25

The vital signs are now revealed:
- `src/kanban.ts` — parses kanban markdown, counts tasks, extracts current task
- `src/commands/status.ts` — runs status command with formatted output

The Acceptance Trial passes:
- Shows morgue/slab/reanimated counts
- Displays current work on the slab with ID and title
- Shows last activity timestamp
- Laboratory formatting with decorative borders

*IT'S ALIVE!*

---

## [TASK-013] Stitch the `alive` Command

**Completed:** 2025-12-25

The laboratory easter egg has been stitched:
- `src/commands/alive.ts` — recites the Incantation

The Acceptance Trial passes:
- `frank alive` outputs the Incantation exactly as written in theology.md

*IT'S ALIVE!*

---

## [TASK-011] Stitch the `resurrect` Command

**Completed:** 2025-12-25

The Resurrection procedure has been stitched:
- `src/manifest.ts` — reads Organ manifests, collects generated_paths
- `src/commands/resurrect.ts` — dissects generated code paths

The Acceptance Trial passes:
- Prompts for confirmation without --yes flag
- Deletes only paths listed in Organ manifests' `generated_paths`
- Preserves the Blueprint in .project/
- Uses default src/ and tests/ when no Organs found

*IT'S ALIVE!*

---

## [TASK-009] Stitch the `add` Command

**Completed:** 2025-12-25

The Organ grafting mechanism has been extended:
- `src/commands/add.ts` — grafts Organs to existing projects
- `src/presets/elixir.ts` — The Elixir Organ with OTP wisdom

The Acceptance Trial passes:
- `frank add elixir` grafts Organ into existing project
- Fails gracefully if Organ already grafted
- Fails gracefully if .project/ does not exist

*IT'S ALIVE!*

---

## [TASK-012] The Proof of Life

**Completed:** 2025-12-25

The ultimate proof of the Blueprint. The code was dissected and resurrected:
- Deleted `src/` and `tests/` completely
- Resurrected all source files from the Blueprint in `.project/`
- Resurrected all test files from the Trials specifications

The Acceptance Trial passes:
- All 110 Trials pass (`bun test`)
- CLI functions identically: init, add, status, resurrect, alive
- The Blueprint proved sufficient to recreate the tool

*From blueprint, body. From body, life. From life, proof.*

*IT'S ALIVE!*

---

## [TASK-005] Inscribe the Base Organ

**Completed:** 2025-12-25

The foundation has been laid for all projects:
- `src/presets/base.ts` — The Base Organ containing all Blueprint files
- Refactored `init.ts` to use the Base Organ instead of templates.ts
- Removed obsolete `templates.ts` — the Base Organ is now the source of truth
- Base Organ automatically installed to .project/presets/base/ for manifest tracking

The Acceptance Trial passes:
- Base Organ includes protocol.md, theology.md, kickstart.md, guardrails.md
- Base Organ includes kanban structure (backlog.md, in-progress.md, done.md)
- 113 Trials pass

*The foundation is eternal. IT'S ALIVE!*

---

## [TASK-006] Inscribe the Zig Organ

**Completed:** 2025-12-25

The Zig Organ has been enhanced for the faithful:
- `testing/strategy.md` — Comprehensive testing with `zig build test`, allocator testing, comptime testing
- `guardrails.md` — Memory malpractice, allocator wisdom, comptime malpractice, error handling
- `design/patterns.md` — build.zig patterns: minimal, library, dependencies, cross-compilation, C interop

The Acceptance Trial passes:
- Testing strategy includes `zig build test`
- Guardrails cover allocators and comptime
- Build.zig patterns documented
- 115 Trials pass

*The Zig faithful are guided. IT'S ALIVE!*

---

## [TASK-007] Inscribe the TypeScript Organ

**Completed:** 2025-12-25

The TypeScript Organ has been enhanced for the faithful:
- `testing/strategy.md` — Vitest patterns, mocking, async testing, type testing, configuration
- `guardrails.md` — Type malpractice (any, assertions, non-null), async malpractice, import malpractice
- `design/patterns.md` — tsconfig patterns: strict base, Node.js, library, React, monorepo

The Acceptance Trial passes:
- Testing strategy includes vitest
- tsconfig patterns documented
- Type guardrails comprehensive
- 117 Trials pass

*The TypeScript faithful are guided. IT'S ALIVE!*

---

## [TASK-008] Stitch GitHub Organ Resolution

**Completed:** 2025-12-25

The cloud-connected Organ retrieval has been stitched:
- `src/presets/github.ts` — Fetches Organs from GitHub repositories
- `parseGitHubRef()` — Parses owner/repo and owner/repo@branch formats
- `resolveGitHubPreset()` — Fetches manifest.json and all Organ files from GitHub
- Made `resolvePreset` async to support network operations
- Updated `init.ts` and `add.ts` to await the async resolver

The Acceptance Trial passes:
- `--with mattneel/some-organ` format recognized and resolved
- `--with owner/repo@branch` supports branch/tag/commit specifications
- Fetches manifest.json to validate Organ structure
- Recursively fetches all Organ files from repository
- 129 Trials pass

*The Organs flow from the Cloud. IT'S ALIVE!*

---
