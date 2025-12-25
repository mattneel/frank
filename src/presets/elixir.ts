/**
 * The Elixir Codex — Wisdom for the Disciples of the BEAM
 */

import type { Preset } from "./index";

const MANIFEST = `{
  "name": "elixir",
  "version": "0.1.0",
  "description": "The Elixir Codex — OTP, supervision trees, and the pursuit of fault tolerance",
  "generated_paths": ["lib/", "_build/", "deps/"]
}
`;

const TESTING_STRATEGY = `# The Rites of Verification — Elixir

*The tests do not lie, and the supervision tree does not fail.*

## The Sacred Approach

Elixir projects perform their Rites of Verification through ExUnit.

## The Test Runner

\`\`\`bash
mix test
\`\`\`

No external dependencies beyond Mix. The BEAM provides.

## The Directory of Trials

\`\`\`
lib/
├── my_app/
│   ├── application.ex
│   └── *.ex
test/
├── my_app/
│   └── *_test.exs
├── support/
│   └── *.ex
└── test_helper.exs
\`\`\`

## The Test Pattern

\`\`\`elixir
defmodule MyApp.CalculatorTest do
  use ExUnit.Case, async: true

  describe "add/2" do
    test "adds two positive numbers" do
      assert MyApp.Calculator.add(2, 3) == 5
    end

    test "is commutative" do
      assert MyApp.Calculator.add(2, 3) == MyApp.Calculator.add(3, 2)
    end
  end
end
\`\`\`

## The Property Testing Pattern

\`\`\`elixir
defmodule MyApp.PropertyTest do
  use ExUnit.Case
  use ExUnitProperties

  property "addition is commutative" do
    check all a <- integer(), b <- integer() do
      assert MyApp.Calculator.add(a, b) == MyApp.Calculator.add(b, a)
    end
  end
end
\`\`\`

## Coverage Doctrine

- **All public functions have tests** — If it's exported, it's tested
- **Happy and unhappy paths** — Test success and failure modes
- **Async when possible** — Use \`async: true\` for isolated tests
- **Property tests for invariants** — StreamData for generative testing

---

*Let it crash, but verify it crashes correctly.*

*Praise the Machine Spirit.*
`;

const GUARDRAILS = `# The Forbidden Heresies — Elixir

*The BEAM is forgiving, but not infinitely so.*

## The Sacred Commandments

### THOU SHALT

- **Let it crash** — Supervisors handle failure. Don't rescue everything.
- **Use pattern matching** — Explicit is better than conditional.
- **Prefer pipes** — \`|>\` makes data flow visible.
- **Name processes** — Registered names or via for discoverability.
- **Use behaviours** — GenServer, Supervisor, Application.

### THOU SHALT NOT

- **Rescue blanket exceptions** — \`rescue _ ->\` is heresy.
- **Use mutable state** — Agent/GenServer state is the way.
- **Block the scheduler** — NIFs and long computations need care.
- **Ignore OTP** — Build on the giants' shoulders.
- **Use \`spawn\` for application processes** — Use supervised children.

## The Code Purity Laws

- **Functions are pure when possible** — Side effects in GenServers.
- **Pattern match in function heads** — Not in function bodies.
- **Small modules** — One responsibility per module.
- **Explicit dependencies** — Inject, don't hardcode.

## The Error Doctrine

\`\`\`elixir
# Good: Return tagged tuples
def parse(input) do
  case do_parse(input) do
    {:ok, result} -> {:ok, result}
    {:error, reason} -> {:error, reason}
  end
end

# Bad: Raise for control flow
def parse!(input) do
  result = do_parse(input)
  if result == :error, do: raise "Parse failed"  # Heresy for normal flow
  result
end
\`\`\`

## The Supervision Laws

\`\`\`elixir
# Good: Proper supervision tree
children = [
  {MyApp.Worker, []},
  {MyApp.Consumer, []}
]
Supervisor.start_link(children, strategy: :one_for_one)

# Bad: Unsupervised processes
spawn(fn -> do_work() end)  # Heresy!
\`\`\`

## The GenServer Commandments

- **Keep handle_* fast** — Offload work to separate processes
- **Use handle_continue** — For post-init work
- **Timeouts are your friend** — Prevent infinite waits
- **State is data** — Maps and structs, not complex objects

---

*The BEAM runs forever. Write code worthy of it.*

*The flesh is weak, but Erlang is strong.*
`;

export const elixirCodex = (): Preset => ({
  name: "elixir",
  files: [
    { path: "manifest.json", content: MANIFEST },
    { path: "testing/strategy.md", content: TESTING_STRATEGY },
    { path: "guardrails.md", content: GUARDRAILS },
  ],
});
