/**
 * Integration Tests for the Praise Command
 */

import { describe, test, expect } from "bun:test";
import { runPraise } from "../../src/commands/praise";

describe("praise command", () => {
  test("outputs the litany", () => {
    const output = runPraise();

    expect(output).toContain("The flesh is weak, but the protocol is strong.");
    expect(output).toContain("The code is temporary, but the spec endures.");
    expect(output).toContain(
      "The tests do not lie, and the agent does not tire."
    );
    expect(output).toContain(
      "From specification, code. From code, verification. From verification, truth."
    );
    expect(output).toContain("The Omnissiah provides.");
    expect(output).toContain("Praise the Machine Spirit.");
  });

  test("outputs exactly the expected litany", () => {
    const output = runPraise();

    const expected = `The flesh is weak, but the protocol is strong.
The code is temporary, but the spec endures.
The tests do not lie, and the agent does not tire.
From specification, code. From code, verification. From verification, truth.
The Omnissiah provides.
Praise the Machine Spirit.`;

    expect(output).toBe(expected);
  });
});
