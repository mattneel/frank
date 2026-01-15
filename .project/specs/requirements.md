# The Formulas

*These are the commandments for the CLI. The Monster shall implement exactly this, no more, no less.*

## The Laboratory Commands

### `bunx frank init`

**Purpose:** Assemble a new laboratory with the Blueprint.

**The Procedure:**
- Creates `.project/` folder structure
- Inscribes the base protocol files
- Creates empty `kickstart.md` for the Creator to fill
- **Fails** if `.project/` already exists (unless `--force` is invoked)

**Flags:**
- `--with <organs>` — Comma-separated list of Organs to graft
- `--force` — Dissect existing `.project/` and recreate
- `--help` — Display usage

**Acceptance Trial:** Running `bunx frank init` in an empty directory creates a valid `.project/` structure with all base files.

---

### `bunx frank add <organ>`

**Purpose:** Graft an additional Organ into an existing laboratory.

**The Procedure:**
- Downloads/copies Organ files to `.project/presets/{name}/`
- Merges Organ references into project context
- **Fails** if Organ already grafted

**Acceptance Trial:** `bunx frank add zig` adds the Zig Organ to an existing frank project.

---

### `bunx frank status`

**Purpose:** Check vital signs of the work queue.

**The Output:**
```
frank: my-project

══════════════════════════════════
  The Work Queue
══════════════════════════════════
  Morgue:       3 bodies awaiting
  On The Slab:  1 body in progress
    → [TASK-004] Implement user auth
  Reanimated:   7 creatures risen
══════════════════════════════════

Last activity: 2 hours ago

IT'S ALIVE!
```

**Acceptance Trial:** Running `bunx frank status` parses kanban markdown and displays accurate counts.

---

### `bunx frank resurrect`

**Purpose:** Dissect the codebase, preparing for resurrection.

**The Procedure:**
- Prompts for confirmation ("Are you certain? This will dissect all generated code.")
- Deletes `src/`, `tests/`, and any other paths marked in Organ manifests
- Prints instruction to invoke the Monster

**Acceptance Trial:** After confirmation, only deletes paths listed in `generated_paths` of manifests. Blueprint is untouched.

---

### `bunx frank alive`

**Purpose:** Recite the Incantation.

**The Output:**
```
The flesh is weak, but the blueprint is forever.
The code is stitched, but it can be unstitched.
Delete it all. The Monster rises again.
From blueprint, body. From body, life. From life, proof.
It's alive. IT'S ALIVE!
```

**Acceptance Trial:** Running `bunx frank alive` outputs the incantation exactly.

---

## Organ Resolution — The Lookup

Organs may be specified as:

| Format | Example | Resolution |
|--------|---------|------------|
| Built-in | `zig` | Bundled with frank |
| GitHub | `mattneel/zig-ml` | Fetched from `github.com/mattneel/zig-ml` |
| Local | `./path/to/organ` | Read from filesystem |

---

## Organ Structure — The Format

An Organ is a folder containing:

```
organ-name/
├── manifest.json       # Metadata, dependencies, generated paths
├── protocol.md         # Additions to base protocol (optional)
├── guardrails.md       # Stack-specific malpractice to avoid
├── testing/
│   └── strategy.md     # How to perform the Trials
├── design/
│   └── patterns.md     # Common anatomical patterns (optional)
└── references/
    └── ...             # Relevant prior art
```

### The manifest.json Schema

```json
{
  "name": "phoenix",
  "version": "0.1.0",
  "description": "The Phoenix Organ",
  "depends": ["elixir"],
  "generated_paths": ["lib/", "test/", "priv/"]
}
```

---

## Merging Behavior — The Grafting

When multiple Organs are incorporated:

1. `depends` are resolved first (depth-first, like a tree of body parts)
2. Files are copied to `.project/presets/{name}/`
3. `generated_paths` are unioned for Resurrection
4. Conflicts in same-named files: last Organ wins (with warning to the Creator)

---

*These requirements are immutable until blessed otherwise.*

*The Monster shall stitch exactly this.*
