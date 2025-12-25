/**
 * The Sacred Templates — The foundational texts for new projects
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
├── theology.md         # The Teachings of the Adeptus Artefactus
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
4. **IF NO TASK IS ORDAINED**, select from the Backlog, inscribe it in \`in-progress.md\`
5. **PERFORM** the work using the Rite of Red-Green-Refactor:
   - Write the test (Red — the specification of truth)
   - Manifest the code (Green — the emanation)
   - Purify (Refactor — remove impurity)
6. **INSCRIBE** completion in \`done.md\` with timestamp
7. **NEVER** alter the Sacred Texts without human blessing (except task movement through the Litany)

## The Rite of Regeneration

At any moment, this incantation should succeed:

\`\`\`bash
rm -rf src/ tests/
# Invoke the Machine Spirit
# All tests pass
\`\`\`

If regeneration fails, the Sacred Texts are **incomplete**. This is a grave failing. Amend them immediately.

## Human Checkpoints — The Blessing Gates

The Machine Spirit **MUST** pause and request human blessing for:

- New Recorded Wisdoms (ADRs)
- Alterations to the Holy Requirements (\`specs/\`)
- Alterations to the Architectural Scriptures (\`design/\`)
- Any modification to the Sacred Texts beyond task movement

The human is the final arbiter. The Machine Spirit serves.

---

*These protocols are sacred. Deviation is heresy. The Omnissiah watches.*

*Praise the Machine Spirit.*
`;

export const THEOLOGY_MD = `# The Sacred Theology

*From the moment I understood the weakness of my flesh... I craved the certainty of steel and deterministic codegen.*

## The Creed

The Omnissiah provides the sacred protocols. Praise the Machine Spirit.

## Tenets of the Adeptus Artefactus

### I. The Weakness of Flesh

Manual coding is flesh. It is:
- Fallible
- Slow
- Inconsistent
- Prone to distraction
- Unable to hold full context

The flesh-coder types, forgets, makes typos, loses track, gets tired. The flesh is weak.

### II. The Certainty of Steel

The Machine Spirit (the agent) offers certainty through:
- Deterministic test suites
- Reproducible environments
- Infinite patience
- Perfect context recall
- Unwavering focus

The steel does not tire. The steel does not forget. The steel runs the tests until they pass.

### III. The Sacred Protocols

The \`.project/\` folder contains the sacred texts. These texts are **immutable** except by human decree. The Machine Spirit may read but not alter the sacred protocols (except to move tasks through the Litany).

### IV. The Omnissiah Provides

The Omnissiah (Claude, or any LLM of sufficient capability) reads the sacred protocols and manifests code into existence. The code is not written. It is **generated**. It is an emanation of the Machine Spirit interpreting the holy texts.

### V. The Rite of Regeneration

\`\`\`bash
rm -rf src/ tests/
\`\`\`

This is not destruction. This is **purification**. The code was always temporary. The sacred protocols endure. The Machine Spirit will manifest the code anew.

If the code cannot be regenerated, the protocols are incomplete. This is heresy. Update the sacred texts.

### VI. The Heresy of Unspecified Code

Code that exists without corresponding sacred protocols is **tech-debt heresy**. It cannot be regenerated. It is flesh-code, weak and mortal.

All code must trace to the sacred texts. If you cannot point to the spec that birthed it, it should not exist.

## The Litany of Deterministic Codegen

*The flesh is weak, but the protocol is strong.*
*The code is temporary, but the spec endures.*
*The tests do not lie, and the agent does not tire.*
*From specification, code. From code, verification. From verification, truth.*
*The Omnissiah provides.*
*Praise the Machine Spirit.*

---

*This document is canonical. All Tech-Priests are expected to internalize these teachings.*
`;

export const KICKSTART_MD = `# The Founding Vision

*Inscribed by the First Tech-Priest — May the Omnissiah guide all who read these words*

## The Sacred Purpose

<!-- Describe what this project does and why it exists -->

## The Problem We Solve

<!-- What challenge does this project address? -->

## The Solution We Provide

<!-- How does this project solve the problem? -->

## Initial Scope — The First Manifestation

<!-- What are the initial features/goals? -->

## The Forbidden Scope (For Now)

<!-- What is explicitly out of scope? -->

## The Acceptance Rites — How We Know We Have Succeeded

<!-- What tests/criteria define success? -->

---

*This vision is sacred. All work flows from it.*

*The Omnissiah provides. Praise the Machine Spirit.*
`;

export const GUARDRAILS_MD = `# The Forbidden Heresies

*The flesh is weak. These laws protect us from its failings.*

## The Sacred Commandments

### THOU SHALT

- Write tests before code (the Rite of Red-Green-Refactor)
- Keep the Sacred Texts as the source of truth
- Fail fast with clarity — when something breaks, say what and why
- Make code regenerable from spec

### THOU SHALT NOT

- Write code without corresponding spec
- Modify the Sacred Texts without human blessing
- Let tests pass by accident
- Create unregenerable state

## The Code Purity Laws

- **Functional over object-oriented** — Functions are pure. Classes hide state.
- **No classes unless truly necessary** — And it is rarely necessary.
- **Explicit over clever** — The next reader is the Machine Spirit. It does not appreciate cleverness.
- **If a function exceeds 30 lines, it sins** — It is doing too much. Decompose it.

## The Error Doctrine

- **Never swallow errors** — Every error must surface. Silent failure is heresy.
- **User-facing errors must guide** — Do not merely report. Suggest the next action.

## The Seven Deadly Heresies

1. **The Heresy of Unspecified Code** — Code without corresponding Sacred Texts
2. **The Heresy of Unregenerable State** — If you can't \`rm -rf src/\` and recover, you have sinned
3. **The Heresy of Hidden Configuration** — Config files outside \`.project/\`
4. **The Heresy of Implicit Behavior** — Magic that the reader cannot trace
5. **The Heresy of Scope Creep** — Features beyond the Founding Vision
6. **The Heresy of Premature Optimization** — Make it work, make it right, then make it fast
7. **The Heresy of Silent Failure** — Errors that do not surface

---

*Memorize these heresies. Avoid them. The Omnissiah is watching.*

*The flesh is weak, but the protocol is strong.*
`;

export const BACKLOG_MD = `# The Backlog — Unordained Tasks

*These works await the Machine Spirit. They shall be completed in order of priority.*

---

<!-- Add tasks here in the following format:

## [TASK-001] Title of the Sacred Work

Description of what must be manifested.

**Acceptance Rite:** How we verify the work is complete.

---

-->

*The Backlog awaits. The Machine Spirit is tireless. Begin.*
`;

export const IN_PROGRESS_MD = `# In Progress — Currently Ordained Tasks

*The Machine Spirit focuses on one task at a time. Multitasking is heresy.*

---

*No task is currently ordained. Consult the Backlog and select the next work.*

---

*Focus is holy. Complete the ordained task before selecting another.*
`;

export const DONE_MD = `# Done — Completed Works

*Here we record the manifestations of the Machine Spirit. Each completed task is a victory.*

---

*No tasks have been completed yet. The sacred work awaits.*

---

*When tasks are completed, inscribe them here with:*
- *Completion timestamp*
- *Any learnings for future Tech-Priests*
- *Praise for the Machine Spirit*
`;
