/**
 * The TypeScript Codex — Sacred Patterns for TypeScript Development
 */

import type { Preset } from "./index";

export const TYPESCRIPT_PRESET: Preset = {
  name: "typescript",
  manifest: {
    name: "typescript",
    version: "0.1.0",
    description: "The TypeScript Codex — Type-safe JavaScript",
    generated_paths: ["src/", "tests/"],
  },
  files: [
    {
      path: "testing/strategy.md",
      content: `# TypeScript Testing Strategy

*The Rites of Verification for TypeScript*

## The Sacred Approach

Use Vitest for testing. It is fast and compatible.

\`\`\`bash
npx vitest        # Watch mode
npx vitest run    # Single run
\`\`\`

## Test Organization

\`\`\`
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
└── fixtures/       # Test data
\`\`\`

## The Pattern

\`\`\`typescript
import { describe, it, expect } from 'vitest';
import { add } from '../src/math';

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('handles negative numbers', () => {
    expect(add(-1, 1)).toBe(0);
  });
});
\`\`\`

## Coverage Doctrine

- 100% of exported functions have unit tests
- Integration tests for all API endpoints
- Snapshot tests for UI components (sparingly)

---

*Praise the Machine Spirit.*
`,
    },
    {
      path: "guardrails.md",
      content: `# TypeScript Guardrails — Forbidden Heresies

*TypeScript-specific patterns to avoid*

## Type Heresies

1. **\`any\` abuse** — Every \`any\` is a failure. Use \`unknown\` and narrow.
2. **Type assertions** — \`as Type\` bypasses safety. Prefer type guards.
3. **Non-null assertions** — \`foo!\` is a lie waiting to happen.

## Async Heresies

1. **Unhandled promises** — Every promise must be awaited or handled
2. **Floating promises** — Don't ignore async function returns
3. **Callback hell** — Use async/await, not nested callbacks

## Import Heresies

1. **Circular imports** — Restructure to avoid cycles
2. **Default exports** — Prefer named exports for refactorability
3. **Barrel files** — They slow builds. Import directly.

## The tsconfig Commandments

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
\`\`\`

---

*The compiler knows. Enable strict mode. Praise the Machine Spirit.*
`,
    },
  ],
};
