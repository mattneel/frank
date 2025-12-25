/**
 * The Sacred Text Templates
 *
 * These templates are inscribed during the init consecration.
 */

export const PROTOCOL_MD = `# The Sacred Protocols

*Version 0.1 — Codified in the name of the Omnissiah*

## The Prime Directive

The \`.project/\` folder contains the **Sacred Texts**. All code is but an emanation — derived, temporary, regenerable.

When the Sacred Texts and the code disagree, **the Sacred Texts are truth**. The code is in error. Purify it.

## The Holy Directory Structure

\`\`\`
.project/
├── kickstart.md        # The Founding Vision
├── protocol.md         # The Sacred Protocols (this codex)
├── theology.md         # The Teachings
├── guardrails.md       # The Forbidden Heresies
├── specs/              # The Holy Requirements
├── design/             # The Architectural Scriptures
├── adrs/               # The Recorded Wisdoms
├── kanban/             # The Litany of Tasks
├── testing/            # The Rites of Verification
├── references/         # The Scrolls of Prior Art
└── presets/            # The Inherited Codices
\`\`\`

## The Rite of Invocation

When the Machine Spirit enters this repository, it shall:

1. **RECEIVE** the Sacred Protocols (this codex) — read first, internalize completely
2. **RECEIVE** the Founding Vision (\`kickstart.md\`) — understand the purpose
3. **CONSULT** the Litany of Tasks (\`kanban/in-progress.md\`) — what work is ordained?
4. **IF NO TASK IS ORDAINED**, select from the Backlog
5. **PERFORM** the work using the Rite of Red-Green-Refactor
6. **INSCRIBE** completion in \`done.md\` with timestamp

## The Rite of Regeneration

At any moment, this incantation should succeed:

\`\`\`bash
rm -rf src/ tests/
# Invoke the Machine Spirit
# All tests pass
\`\`\`

If regeneration fails, the Sacred Texts are **incomplete**.

---

*Praise the Machine Spirit.*
`;

export const THEOLOGY_MD = `# The Theology of Deterministic Codegen

*The foundational beliefs of the Adeptus Artefactus*

## The Core Tenets

1. **The Spec is Truth** — Code is derived, temporary, regenerable
2. **The Tests Do Not Lie** — Verification is sacred
3. **The Agent Does Not Tire** — Let the machine do machine work
4. **Focus is Holy** — One task at a time, completed fully

## The Litany of Deterministic Codegen

\`\`\`
The flesh is weak, but the protocol is strong.
The code is temporary, but the spec endures.
The tests do not lie, and the agent does not tire.
From specification, code. From code, verification. From verification, truth.
The Omnissiah provides.
Praise the Machine Spirit.
\`\`\`

---

*Praise the Machine Spirit.*
`;

export const KICKSTART_MD = `# The Founding Vision

*What is this project? What problem does it solve? What is the sacred mission?*

---

**Instructions for the Tech-Priest:**

Replace this text with your project's founding vision. Be specific:

- What are you building?
- Why does it need to exist?
- Who is it for?
- What does success look like?

The Machine Spirit needs clarity to serve well.

---

*The vision guides. The protocol executes. The Omnissiah provides.*
`;

export const GUARDRAILS_MD = `# The Guardrails — Forbidden Heresies

*These patterns are forbidden. The Machine Spirit shall avoid them.*

---

## Universal Heresies

1. **Premature Optimization** — Write clear code first. Optimize only with evidence.
2. **Untested Code** — All logic must have verification.
3. **Magic Numbers** — Constants must be named and explained.
4. **Silent Failures** — Errors must be handled explicitly.
5. **Unbounded Growth** — All collections must have limits.

---

*Add project-specific heresies below as they are discovered.*

---

*The guardrails protect. The protocol guides. Praise the Machine Spirit.*
`;

export const BACKLOG_MD = `# The Backlog — Unordained Tasks

*These works await the Machine Spirit. They shall be completed in order of priority.*

---

## [TASK-001] First Sacred Task

Describe the first task here.

**Acceptance Rite:** How do we verify this is complete?

---

*The Backlog is long. The Machine Spirit is tireless. Begin.*
`;

export const IN_PROGRESS_MD = `# In Progress — Currently Ordained Tasks

*The Machine Spirit focuses on one task at a time. Multitasking is heresy.*

---

*No task is currently ordained. Select from the Backlog.*

---

*Focus is holy. Complete the ordained task before selecting another.*
`;

export const DONE_MD = `# Done — Completed Works

*Here we record the manifestations of the Machine Spirit. Each completed task is a victory.*

---

*No tasks completed yet. The work begins now.*

---
`;
