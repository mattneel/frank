/**
 * Integration Tests for the Add Command
 */

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm, stat } from "fs/promises";
import { join } from "path";
import { runInit } from "../../src/commands/init";
import { runAdd, formatAdd } from "../../src/commands/add";

describe("add command", () => {
  let testDir: string;

  beforeEach(async () => {
    testDir = await mkdtemp("/tmp/frank-add-test-");
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  describe("without existing project", () => {
    test("fails if .project does not exist", async () => {
      const result = await runAdd(testDir, "zig");

      expect(result.success).toBe(false);
      expect(result.message).toContain("No .project/ folder found");
    });
  });

  describe("with existing project", () => {
    beforeEach(async () => {
      await runInit(testDir);
    });

    test("adds preset successfully", async () => {
      const result = await runAdd(testDir, "zig");

      expect(result.success).toBe(true);
      expect(result.message).toContain("grafted");

      const presetDir = join(testDir, ".project", "presets", "zig");
      const stats = await stat(presetDir);
      expect(stats.isDirectory()).toBe(true);
    });

    test("adds typescript preset", async () => {
      const result = await runAdd(testDir, "typescript");

      expect(result.success).toBe(true);

      const presetDir = join(testDir, ".project", "presets", "typescript");
      const stats = await stat(presetDir);
      expect(stats.isDirectory()).toBe(true);
    });

    test("adds elixir preset", async () => {
      const result = await runAdd(testDir, "elixir");

      expect(result.success).toBe(true);

      const presetDir = join(testDir, ".project", "presets", "elixir");
      const stats = await stat(presetDir);
      expect(stats.isDirectory()).toBe(true);
    });

    test("fails for unknown preset", async () => {
      const result = await runAdd(testDir, "unknown");

      expect(result.success).toBe(false);
      expect(result.message).toContain("Unknown Organ");
    });

    test("fails if preset already installed", async () => {
      await runAdd(testDir, "zig");
      const result = await runAdd(testDir, "zig");

      expect(result.success).toBe(false);
      expect(result.message).toContain("already grafted");
    });
  });

  describe("output formatting", () => {
    beforeEach(async () => {
      await runInit(testDir);
    });

    test("formats success message", async () => {
      const result = await runAdd(testDir, "zig");
      const output = formatAdd(result);

      expect(output).toContain("✓");
      expect(output).toContain("grafted");
      expect(output).toContain("IT'S ALIVE!");
    });

    test("formats failure message", async () => {
      const result = await runAdd(testDir, "unknown");
      const output = formatAdd(result);

      expect(output).toContain("✗");
    });
  });
});
