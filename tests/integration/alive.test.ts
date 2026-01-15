/**
 * Integration Tests for the Alive Command
 */

import { describe, test, expect } from "bun:test";
import { runAlive } from "../../src/commands/alive";

describe("alive command", () => {
  test("outputs the incantation", () => {
    const output = runAlive();

    expect(output).toContain("The flesh is weak, but the blueprint is forever.");
    expect(output).toContain("The code is stitched, but it can be unstitched.");
    expect(output).toContain("Delete it all. The Monster rises again.");
    expect(output).toContain(
      "From blueprint, body. From body, life. From life, proof."
    );
    expect(output).toContain("It's alive. IT'S ALIVE!");
  });

  test("outputs exactly the expected incantation", () => {
    const output = runAlive();

    const expected = `The flesh is weak, but the blueprint is forever.
The code is stitched, but it can be unstitched.
Delete it all. The Monster rises again.
From blueprint, body. From body, life. From life, proof.
It's alive. IT'S ALIVE!`;

    expect(output).toBe(expected);
  });
});
