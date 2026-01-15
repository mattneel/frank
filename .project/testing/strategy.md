# The Trials

*The tests do not lie, and the Monster does not tire.*

## The Approach

frank is a CLI tool. The Trials focus on:

1. **Unit Trials** — Individual functions tested in isolation (organ parsing, manifest validation)
2. **Integration Trials** — Full CLI commands tested against temporary directories
3. **The Proof of Life** — Can frank resurrect itself?

## The Test Runner

We invoke Bun's built-in test runner: `bun test`

No external dependencies. Bun provides.

## The Directory of Trials

```
tests/
├── unit/                      # Unit Trials
│   ├── preset.test.ts
│   ├── manifest.test.ts
│   └── kanban-parser.test.ts
├── integration/               # Integration Trials
│   ├── init.test.ts
│   ├── add.test.ts
│   ├── status.test.ts
│   ├── resurrect.test.ts
│   └── alive.test.ts
└── fixtures/                  # Test Specimens
    ├── valid-organ/
    ├── invalid-organ/
    └── sample-project/
```

## The Integration Trial Pattern

Each Integration Trial shall:

1. Assemble a temporary directory
2. Invoke the CLI command
3. Assert upon the resulting file structure
4. Clean up the temporary directory

```typescript
import { test, expect } from "bun:test";
import { mkdtemp, rm } from "fs/promises";
import { join } from "path";

test("init assembles .project folder", async () => {
  // Assemble temporary space
  const tmp = await mkdtemp("/tmp/frank-test-");

  // Invoke the command
  await run(`frank init`, { cwd: tmp });

  // Verify the Blueprint exists
  expect(await exists(join(tmp, ".project/protocol.md"))).toBe(true);
  expect(await exists(join(tmp, ".project/kickstart.md"))).toBe(true);
  expect(await exists(join(tmp, ".project/theology.md"))).toBe(true);
  expect(await exists(join(tmp, ".project/kanban/backlog.md"))).toBe(true);

  // Clean up
  await rm(tmp, { recursive: true });
});
```

## The Proof of Life

The ultimate Trial. If frank cannot resurrect itself, it is unworthy:

```bash
# From the frank repository root
cd frank

# Dissect all generated code
rm -rf src/ tests/

# Invoke Resurrection
bunx frank resurrect --yes

# Summon the Monster
claude

# The Monster works...

# Perform all Trials
bun test

# All tests MUST pass
```

If the Proof of Life succeeds, the Blueprint is complete. The protocol works. IT'S ALIVE!

If it fails, the Blueprint is **incomplete**. Amend it. Try again.

## Coverage Doctrine

- **100%** of CLI commands have Integration Trials
- **All** non-trivial parsing logic has Unit Trials
- **The Proof of Life** runs in CI on every push
- Uncovered code is sus. Investigate it.

## The Red-Green-Refactor Procedure

When implementing each task:

1. **RED** — Write the test first. Watch it fail. The failure is truth.
2. **GREEN** — Write the minimum code to pass. No more.
3. **REFACTOR** — Refine the code. Remove duplication. Simplify.

This is the way. Deviation is malpractice.

---

*The tests do not lie, and the Monster does not tire.*

*From blueprint, body. From body, life. From life, proof.*

*IT'S ALIVE!*
