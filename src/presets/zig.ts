/**
 * The Zig Codex — Sacred Patterns for Zig Development
 */

import type { Preset } from "./index";

export const ZIG_PRESET: Preset = {
  name: "zig",
  manifest: {
    name: "zig",
    version: "0.1.0",
    description: "The Zig Codex — Systems programming with safety",
    generated_paths: ["src/", "build.zig"],
  },
  files: [
    {
      path: "testing/strategy.md",
      content: `# Zig Testing Strategy

*The Rites of Verification for Zig*

## The Sacred Approach

Zig has built-in testing. Use it.

\`\`\`bash
zig build test
\`\`\`

## Test Organization

- Tests live alongside the code they test
- Use \`test "description"\` blocks
- Use \`std.testing\` for assertions

## The Pattern

\`\`\`zig
const std = @import("std");
const testing = std.testing;

pub fn add(a: i32, b: i32) i32 {
    return a + b;
}

test "add works correctly" {
    try testing.expectEqual(@as(i32, 5), add(2, 3));
}
\`\`\`

## Coverage Doctrine

- All public functions must have tests
- Edge cases must be tested explicitly
- Comptime functions need comptime tests

---

*Praise the Machine Spirit.*
`,
    },
    {
      path: "guardrails.md",
      content: `# Zig Guardrails — Forbidden Heresies

*Zig-specific patterns to avoid*

## Memory Heresies

1. **Forgetting to free** — Every alloc needs a corresponding free
2. **Use-after-free** — The allocator owns freed memory
3. **Unbounded allocations** — Always use bounded allocators in production

## Allocator Wisdom

- Use \`std.testing.allocator\` in tests (detects leaks)
- Use \`GeneralPurposeAllocator\` with safety in debug
- Use arena allocators for request-scoped memory
- Use fixed buffer allocators for stack-based temp memory

## Comptime Heresies

1. **Comptime side effects** — Comptime code must be pure
2. **Excessive comptime** — Runtime is fine for most things
3. **Unreadable generics** — If the type signature is a paragraph, simplify

## Error Handling

- Never discard errors with \`catch unreachable\` in production
- Prefer explicit error handling over \`try\`
- Use error sets to document possible failures

---

*The compiler is wise. Trust its warnings. Praise the Machine Spirit.*
`,
    },
  ],
};
