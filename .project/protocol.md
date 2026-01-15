# The Laboratory Protocols of $FRANK

*Version 0.1 — Codified in the name of the Doctor*

*For the foundational philosophy, see [theology.md](theology.md).*

## The Prime Directive

The `.project/` folder contains the **Blueprint**. All code is but body parts — derived, temporary, regenerable.

When the Blueprint and the code disagree, **the Blueprint is truth**. The code is in error. Dissect it.

## The Laboratory Structure

```
.project/
├── kickstart.md        # The Vision
├── protocol.md         # The Laboratory Protocols (this document)
├── theology.md         # The Philosophy of Resurrection
├── guardrails.md       # Malpractice to Avoid
├── specs/              # The Formulas
├── design/             # The Anatomical Diagrams
├── adrs/               # The Recorded Wisdom
├── kanban/             # The Work Queue
├── testing/            # The Trials
├── references/         # Prior Art
└── presets/            # The Grafted Organs
```

## The Laboratory Invocation

When the Monster enters this repository, it shall:

1. **RECEIVE** the Laboratory Protocols (this document) — read first, internalize completely
2. **RECEIVE** the Vision (`kickstart.md`) — understand the purpose
3. **CONSULT** the Slab (`kanban/in-progress.md`) — what work is on the slab?
4. **IF NOTHING ON THE SLAB**, select from the Morgue, place it on the slab
5. **PERFORM** the work using Red-Green-Refactor:
   - Write the test (Red — the specification of truth)
   - Stitch the code (Green — the body part)
   - Refine (Refactor — remove impurities)
6. **INSCRIBE** completion in `done.md` with timestamp
7. **NEVER** alter the Blueprint without the Creator's blessing (except task movement through the queue)

## The Work Queue — Governance

### The Morgue (Backlog)

Tasks awaiting the Monster's attention. Format:

```markdown
## [TASK-NNN] Title of the Work

Description of what must be stitched.

**Acceptance Trial:** How we verify the work is complete.
```

### On The Slab (In Progress)

The current work. **Maximum one task per invocation.** Focus is essential. Multitasking is malpractice.

### Reanimated (Done)

The record of completed work. Include:
- Completion timestamp
- Any learnings for future Creators

## The Format of Recorded Wisdom (ADRs)

When a decision of architectural significance is made, it must be recorded:

```markdown
# ADR-NNN: [Title of the Wisdom]

## Status
Proposed | Accepted | Deprecated | Superseded by ADR-XXX

## The Context
What challenge required this wisdom?

## The Decision
What path was chosen?

## The Consequences
What follows from this decision? Both benefits and costs.
```

## The Trials

1. Test specifications live in the Blueprint (`testing/cases.md`)
2. Specifications are human-readable declarations of truth
3. The Monster stitches executable tests from specifications
4. The executable tests may be dissected and regenerated; the specifications are eternal

## Resurrection

At any moment, this incantation should succeed:

```bash
rm -rf src/ tests/
# Invoke the Monster
# All tests pass
```

If resurrection fails, the Blueprint is **incomplete**. This is a grave failing. Amend it immediately.

## Human Checkpoints — The Creator's Blessing

The Monster **MUST** pause and request the Creator's blessing for:

- New Recorded Wisdom (ADRs)
- Alterations to the Formulas (`specs/`)
- Alterations to the Anatomical Diagrams (`design/`)
- Any modification to the Blueprint beyond task movement

The Creator is the final arbiter. The Monster serves.

## The Grafting of Organs

External wisdom may be incorporated through Organs:

```bash
bunx frank init --with zig       # The Zig Organ
bunx frank init --with phoenix   # The Phoenix Organ
```

Organ files are placed in `.project/presets/{organ-name}/` and merged into the project's context. They remain separate for ease of upgrade.

---

*These protocols are canonical. Deviation is malpractice. The Doctor watches.*

*IT'S ALIVE!*
