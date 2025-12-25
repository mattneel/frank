/**
 * Unit Tests for the Argument Parser
 */

import { describe, test, expect } from "bun:test";
import { parseArgs } from "../../src/args";

describe("parseArgs", () => {
  describe("commands", () => {
    test("parses init command", () => {
      const result = parseArgs(["init"]);
      expect(result.command).toBe("init");
      expect(result.error).toBeUndefined();
    });

    test("parses add command", () => {
      const result = parseArgs(["add"]);
      expect(result.command).toBe("add");
      expect(result.error).toBeUndefined();
    });

    test("parses status command", () => {
      const result = parseArgs(["status"]);
      expect(result.command).toBe("status");
      expect(result.error).toBeUndefined();
    });

    test("parses regenerate command", () => {
      const result = parseArgs(["regenerate"]);
      expect(result.command).toBe("regenerate");
      expect(result.error).toBeUndefined();
    });

    test("parses praise command", () => {
      const result = parseArgs(["praise"]);
      expect(result.command).toBe("praise");
      expect(result.error).toBeUndefined();
    });

    test("returns error for unknown command", () => {
      const result = parseArgs(["unknown"]);
      expect(result.error).toBe("Unknown command: unknown");
    });

    test("no command returns undefined", () => {
      const result = parseArgs([]);
      expect(result.command).toBeUndefined();
      expect(result.error).toBeUndefined();
    });
  });

  describe("flags", () => {
    test("parses --help flag", () => {
      const result = parseArgs(["--help"]);
      expect(result.flags.help).toBe(true);
    });

    test("parses -h flag", () => {
      const result = parseArgs(["-h"]);
      expect(result.flags.help).toBe(true);
    });

    test("parses --version flag", () => {
      const result = parseArgs(["--version"]);
      expect(result.flags.version).toBe(true);
    });

    test("parses -v flag", () => {
      const result = parseArgs(["-v"]);
      expect(result.flags.version).toBe(true);
    });

    test("parses --force flag", () => {
      const result = parseArgs(["init", "--force"]);
      expect(result.flags.force).toBe(true);
    });

    test("parses -f flag", () => {
      const result = parseArgs(["init", "-f"]);
      expect(result.flags.force).toBe(true);
    });

    test("parses --yes flag", () => {
      const result = parseArgs(["regenerate", "--yes"]);
      expect(result.flags.yes).toBe(true);
    });

    test("parses -y flag", () => {
      const result = parseArgs(["regenerate", "-y"]);
      expect(result.flags.yes).toBe(true);
    });

    test("parses --with flag with single preset", () => {
      const result = parseArgs(["init", "--with", "zig"]);
      expect(result.flags.with).toEqual(["zig"]);
    });

    test("parses --with flag with multiple presets", () => {
      const result = parseArgs(["init", "--with", "zig,typescript"]);
      expect(result.flags.with).toEqual(["zig", "typescript"]);
    });

    test("returns error for unknown flag", () => {
      const result = parseArgs(["--unknown"]);
      expect(result.error).toBe("Unknown flag: --unknown");
    });

    test("returns error for unknown short flag", () => {
      const result = parseArgs(["-x"]);
      expect(result.error).toBe("Unknown flag: -x");
    });
  });

  describe("arguments", () => {
    test("collects arguments after command", () => {
      const result = parseArgs(["add", "zig"]);
      expect(result.command).toBe("add");
      expect(result.args).toEqual(["zig"]);
    });

    test("collects multiple arguments", () => {
      const result = parseArgs(["add", "zig", "typescript"]);
      expect(result.args).toEqual(["zig", "typescript"]);
    });
  });

  describe("combined", () => {
    test("parses command with flags and arguments", () => {
      const result = parseArgs(["init", "--force", "--with", "zig"]);
      expect(result.command).toBe("init");
      expect(result.flags.force).toBe(true);
      expect(result.flags.with).toEqual(["zig"]);
    });

    test("flags default to false", () => {
      const result = parseArgs(["init"]);
      expect(result.flags.help).toBe(false);
      expect(result.flags.version).toBe(false);
      expect(result.flags.force).toBe(false);
      expect(result.flags.yes).toBe(false);
      expect(result.flags.with).toEqual([]);
    });
  });
});
