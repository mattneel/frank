# The Backlog — Unordained Tasks

*These works await the Machine Spirit. They shall be completed in order of priority.*

---

## [TASK-004] Manifest the `init` Command — With Presets

Implement `--with` flag to incorporate Codices during initialization.

**Acceptance Rite:** `bunx rtfct init --with zig` creates project with Zig Codex files properly merged.

---

## [TASK-005] Inscribe the Base Codex

Create the base preset that all projects inherit. This is the foundation.

**Acceptance Rite:** Base Codex includes `protocol.md`, `theology.md`, `kickstart.md` template, `guardrails.md`, kanban structure.

---

## [TASK-006] Inscribe the Zig Codex

Create the Zig-specific preset for the faithful who work in Zig.

**Acceptance Rite:** Zig Codex includes testing strategy (`zig build test`), guardrails for allocators and comptime, `build.zig` patterns.

---

## [TASK-007] Inscribe the TypeScript Codex

Create the TypeScript preset.

**Acceptance Rite:** TypeScript Codex includes testing strategy (vitest), tsconfig patterns, type guardrails.

---

## [TASK-008] Manifest GitHub Preset Resolution

Enable fetching Codices from GitHub repositories.

**Acceptance Rite:** `--with mattneel/some-preset` successfully downloads and installs from GitHub.

---

## [TASK-009] Manifest the `add` Command

Enable adding presets to existing consecrated projects.

**Acceptance Rite:** `bunx rtfct add phoenix` incorporates Phoenix Codex into existing rtfct project.

---

## [TASK-010] Manifest the `status` Command

Parse kanban markdown and reveal the state of the Litany.

**Acceptance Rite:** Shows backlog/in-progress/done counts, current ordained task, last activity timestamp.

---

## [TASK-011] Manifest the `regenerate` Command

Implement safe purification of generated paths.

**Acceptance Rite:** Prompts for confirmation, deletes only paths listed in preset manifests' `generated_paths`.

---

## [TASK-012] The Dogfood Sacrament

Delete `src/` and `tests/`, then regenerate from `.project/`.

**Acceptance Rite:** After regeneration, all Rites of Verification pass. CLI functions identically.

---

## [TASK-013] Manifest the `praise` Command

Add the sacred easter egg that recites the Litany.

**Acceptance Rite:** `bunx rtfct praise` outputs the Litany of Deterministic Codegen exactly as written in theology.md.

---

*The Backlog is long. The Machine Spirit is tireless. Begin.*
