/**
 * The Base Organ — Foundation for All Projects
 *
 * This preset contains the core Blueprint that every frank project inherits.
 * It is automatically applied during `frank init`.
 */

import type { Preset } from "./index";

const PROTOCOL_MD = `# The Laboratory Protocols

*Version 0.1 — Codified in the name of the Doctor*

## The Prime Directive

The \`.project/\` folder contains the **Blueprint**. All code is but body parts — derived, temporary, regenerable.

When the Blueprint and the code disagree, **the Blueprint is truth**. The code is in error. Dissect it.

## The Laboratory Structure

\`\`\`
.project/
├── kickstart.md        # The Vision
├── protocol.md         # The Laboratory Protocols (this document)
├── theology.md         # The Philosophy
├── guardrails.md       # Malpractice to Avoid
├── specs/              # The Formulas
├── design/             # The Anatomical Diagrams
├── adrs/               # The Recorded Wisdom
├── kanban/             # The Work Queue
├── testing/            # The Trials
├── references/         # Prior Art
└── presets/            # The Grafted Organs
\`\`\`

## The Laboratory Invocation

When the Monster enters this repository, it shall:

1. **RECEIVE** the Laboratory Protocols (this document) — read first, internalize completely
2. **RECEIVE** the Vision (\`kickstart.md\`) — understand the purpose
3. **CONSULT** the Slab (\`kanban/in-progress.md\`) — what work is on the slab?
4. **IF NOTHING ON THE SLAB**, select from the Morgue
5. **PERFORM** the work using Red-Green-Refactor
6. **INSCRIBE** completion in \`done.md\` with timestamp

## Resurrection

At any moment, this incantation should succeed:

\`\`\`bash
rm -rf src/ tests/
# Invoke the Monster
# All tests pass
\`\`\`

If resurrection fails, the Blueprint is **incomplete**.

---

*IT'S ALIVE!*
`;

const THEOLOGY_MD = `# The Philosophy of Resurrection

*The foundational beliefs of blueprint-driven development*

## The Core Tenets

1. **The Blueprint is Truth** — Code is derived, temporary, regenerable
2. **The Tests Do Not Lie** — Verification is essential
3. **The Monster Does Not Tire** — Let the machine do machine work
4. **Focus is Essential** — One task at a time, completed fully

## The Incantation

\`\`\`
The flesh is weak, but the blueprint is forever.
The code is stitched, but it can be unstitched.
Delete it all. The Monster rises again.
From blueprint, body. From body, life. From life, proof.
It's alive. IT'S ALIVE!
\`\`\`

---

*IT'S ALIVE!*
`;

const KICKSTART_MD = `# The Vision

*What is this project? What problem does it solve? What is the mission?*

---

**Instructions for the Creator:**

Replace this text with your project's vision. Be specific:

- What are you building?
- Why does it need to exist?
- Who is it for?
- What does success look like?

The Monster needs clarity to serve well.

---

*The vision guides. The protocol executes. The Doctor provides.*
`;

const GUARDRAILS_MD = `# Malpractice to Avoid

*These patterns are forbidden. The Monster shall avoid them.*

---

## Universal Malpractice

1. **Premature Optimization** — Write clear code first. Optimize only with evidence.
2. **Untested Code** — All logic must have verification.
3. **Magic Numbers** — Constants must be named and explained.
4. **Silent Failures** — Errors must be handled explicitly.
5. **Unbounded Growth** — All collections must have limits.

---

*Add project-specific malpractice below as they are discovered.*

---

*The guardrails protect. The protocol guides. IT'S ALIVE!*
`;

const BACKLOG_MD = `# The Morgue — Bodies Awaiting Resurrection

*These works await the Monster. They shall be completed in order of priority.*

---

## [TASK-001] First Task

Describe the first task here.

**Acceptance Trial:** How do we verify this is complete?

---

*The Morgue is long. The Monster is tireless. Begin.*
`;

const IN_PROGRESS_MD = `# On The Slab — Current Work

*The Monster focuses on one body at a time. Multitasking is malpractice.*

---

*No body currently on the slab. Select from the Morgue.*

---

*Focus is essential. Complete the current work before selecting another.*
`;

const DONE_MD = `# Reanimated — Completed Works

*Here we record the Monster's work. Each completed task is a creature risen.*

---

*No tasks completed yet. The work begins now.*

---
`;

export const BASE_PRESET: Preset = {
  name: "base",
  manifest: {
    name: "base",
    version: "0.1.0",
    description: "The Base Organ — Foundation for all projects",
    generated_paths: ["src/", "tests/"],
  },
  files: [
    { path: "protocol.md", content: PROTOCOL_MD },
    { path: "theology.md", content: THEOLOGY_MD },
    { path: "kickstart.md", content: KICKSTART_MD },
    { path: "guardrails.md", content: GUARDRAILS_MD },
    { path: "kanban/backlog.md", content: BACKLOG_MD },
    { path: "kanban/in-progress.md", content: IN_PROGRESS_MD },
    { path: "kanban/done.md", content: DONE_MD },
  ],
};
