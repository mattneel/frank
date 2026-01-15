/**
 * Integration Tests for the Resurrect Command
 */

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm, stat, mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { runInit } from "../../src/commands/init";
import {
  runResurrect,
  formatResurrect,
} from "../../src/commands/resurrect";

describe("resurrect command", () => {
  let testDir: string;

  beforeEach(async () => {
    testDir = await mkdtemp("/tmp/frank-resurrect-test-");
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  describe("without existing project", () => {
    test("fails if .project does not exist", async () => {
      const result = await runResurrect(testDir);

      expect(result.success).toBe(false);
      expect(result.message).toContain("No .project/ folder found");
    });
  });

  describe("confirmation behavior", () => {
    beforeEach(async () => {
      await runInit(testDir);
    });

    test("requires confirmation without --yes", async () => {
      const result = await runResurrect(testDir);

      expect(result.success).toBe(true);
      expect(result.requiresConfirmation).toBe(true);
      expect(result.pathsToDelete).toBeDefined();
    });

    test("proceeds with --yes flag", async () => {
      const result = await runResurrect(testDir, { yes: true });

      expect(result.success).toBe(true);
      expect(result.requiresConfirmation).toBeUndefined();
    });
  });

  describe("path deletion", () => {
    beforeEach(async () => {
      await runInit(testDir);
    });

    test("deletes default paths when no presets", async () => {
      // Create src/ and tests/
      await mkdir(join(testDir, "src"));
      await writeFile(join(testDir, "src", "index.ts"), "// code");
      await mkdir(join(testDir, "tests"));
      await writeFile(join(testDir, "tests", "test.ts"), "// test");

      const result = await runResurrect(testDir, { yes: true });

      expect(result.success).toBe(true);
      expect(result.deletedPaths).toContain("src/");
      expect(result.deletedPaths).toContain("tests/");

      // Verify paths are deleted
      try {
        await stat(join(testDir, "src"));
        expect(true).toBe(false); // Should not reach here
      } catch {
        // Expected - directory should not exist
      }
    });

    test("deletes paths from preset manifests", async () => {
      await runInit(testDir, { presets: ["zig"], force: true });

      // Create files that match the zig preset's generated_paths
      await mkdir(join(testDir, "src"));
      await writeFile(join(testDir, "src", "main.zig"), "// zig code");
      await writeFile(join(testDir, "build.zig"), "// build");

      const result = await runResurrect(testDir, { yes: true });

      expect(result.success).toBe(true);
      expect(result.deletedPaths).toContain("src/");
      expect(result.deletedPaths).toContain("build.zig");
    });

    test("handles non-existent paths gracefully", async () => {
      // Don't create src/ or tests/
      const result = await runResurrect(testDir, { yes: true });

      expect(result.success).toBe(true);
      // Paths might be empty since nothing existed to delete
    });

    test("preserves .project directory", async () => {
      await mkdir(join(testDir, "src"));

      await runResurrect(testDir, { yes: true });

      // .project should still exist
      const projectStats = await stat(join(testDir, ".project"));
      expect(projectStats.isDirectory()).toBe(true);

      // And its files should still exist
      const protocolStats = await stat(join(testDir, ".project", "protocol.md"));
      expect(protocolStats.isFile()).toBe(true);
    });
  });

  describe("output formatting", () => {
    beforeEach(async () => {
      await runInit(testDir);
    });

    test("formats confirmation request", async () => {
      const result = await runResurrect(testDir);
      const output = formatResurrect(result);

      expect(output).toContain("Dissection");
      expect(output).toContain("Run with --yes");
    });

    test("formats success output", async () => {
      await mkdir(join(testDir, "src"));

      const result = await runResurrect(testDir, { yes: true });
      const output = formatResurrect(result);

      expect(output).toContain("✓");
      expect(output).toContain("dissected");
      expect(output).toContain("IT'S ALIVE!");
    });

    test("formats failure output", async () => {
      await rm(testDir, { recursive: true, force: true });
      testDir = await mkdtemp("/tmp/frank-resurrect-test-");

      const result = await runResurrect(testDir);
      const output = formatResurrect(result);

      expect(output).toContain("✗");
    });
  });
});
