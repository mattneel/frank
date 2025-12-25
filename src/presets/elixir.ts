/**
 * The Elixir Codex — Sacred Patterns for Elixir/OTP Development
 */

import type { Preset } from "./index";

export const ELIXIR_PRESET: Preset = {
  name: "elixir",
  manifest: {
    name: "elixir",
    version: "0.1.0",
    description: "The Elixir Codex — Functional programming with OTP",
    generated_paths: ["lib/", "test/"],
  },
  files: [
    {
      path: "testing/strategy.md",
      content: `# Elixir Testing Strategy

*The Rites of Verification for Elixir*

## The Sacred Approach

Use ExUnit, the built-in test framework.

\`\`\`bash
mix test           # Run all tests
mix test --cover   # With coverage
\`\`\`

## Test Organization

\`\`\`
test/
├── unit/              # Unit tests for pure functions
├── integration/       # Tests involving multiple modules
├── support/           # Test helpers and fixtures
└── test_helper.exs    # Test configuration
\`\`\`

## The Pattern

\`\`\`elixir
defmodule MyApp.MathTest do
  use ExUnit.Case, async: true

  describe "add/2" do
    test "adds two numbers" do
      assert MyApp.Math.add(2, 3) == 5
    end

    test "handles negative numbers" do
      assert MyApp.Math.add(-1, 1) == 0
    end
  end
end
\`\`\`

## Coverage Doctrine

- All public functions have doctests or explicit tests
- GenServers tested with start_supervised
- Async tests where possible for speed

---

*Praise the Machine Spirit.*
`,
    },
    {
      path: "guardrails.md",
      content: `# Elixir Guardrails — Forbidden Heresies

*Elixir-specific patterns to avoid*

## OTP Heresies

1. **Naked spawn** — Use Task or GenServer, not raw spawn
2. **Ignoring :DOWN** — Monitor linked processes properly
3. **Global state** — Use process state or ETS, not module attributes

## Pattern Matching Heresies

1. **Catch-all first** — Specific patterns before general ones
2. **Ignoring warnings** — Dialyzer warnings are prophecy
3. **Deep nesting** — Use \`with\` for railway-oriented programming

## Process Heresies

1. **Unbounded mailboxes** — Add backpressure or load shedding
2. **Synchronous GenServer calls in init** — Defer with handle_continue
3. **Long-running calls** — Use cast or Task for slow operations

## The Holy Patterns

\`\`\`elixir
# Railway-oriented programming with 'with'
with {:ok, user} <- fetch_user(id),
     {:ok, account} <- fetch_account(user),
     {:ok, balance} <- get_balance(account) do
  {:ok, balance}
end

# Proper supervision
children = [
  {MyApp.Worker, []},
  {MyApp.Cache, []}
]
Supervisor.start_link(children, strategy: :one_for_one)
\`\`\`

---

*Let it crash. The supervisor provides. Praise the Machine Spirit.*
`,
    },
  ],
};
