/**
 * Integration Tests for the Init Command
 */

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm, stat, readFile, readdir } from "fs/promises";
import { join } from "path";
import { runInit, formatInit } from "../../src/commands/init";

describe("init command", () => {
  let testDir: string;

  beforeEach(async () => {
    testDir = await mkdtemp("/tmp/rtfct-init-test-");
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  describe("basic initialization", () => {
    test("creates .project directory", async () => {
      const result = await runInit(testDir);

      expect(result.success).toBe(true);
      const projectDir = join(testDir, ".project");
      const stats = await stat(projectDir);
      expect(stats.isDirectory()).toBe(true);
    });

    test("creates protocol.md", async () => {
      await runInit(testDir);

      const filePath = join(testDir, ".project", "protocol.md");
      const stats = await stat(filePath);
      expect(stats.isFile()).toBe(true);
    });

    test("creates theology.md", async () => {
      await runInit(testDir);

      const filePath = join(testDir, ".project", "theology.md");
      const stats = await stat(filePath);
      expect(stats.isFile()).toBe(true);
    });

    test("creates kickstart.md", async () => {
      await runInit(testDir);

      const filePath = join(testDir, ".project", "kickstart.md");
      const stats = await stat(filePath);
      expect(stats.isFile()).toBe(true);
    });

    test("creates guardrails.md", async () => {
      await runInit(testDir);

      const filePath = join(testDir, ".project", "guardrails.md");
      const stats = await stat(filePath);
      expect(stats.isFile()).toBe(true);
    });

    test("creates kanban directory with files", async () => {
      await runInit(testDir);

      const kanbanDir = join(testDir, ".project", "kanban");
      const stats = await stat(kanbanDir);
      expect(stats.isDirectory()).toBe(true);

      const files = await readdir(kanbanDir);
      expect(files).toContain("backlog.md");
      expect(files).toContain("in-progress.md");
      expect(files).toContain("done.md");
    });

    test("creates all subdirectories", async () => {
      await runInit(testDir);

      const dirs = [
        "specs",
        "design",
        "adrs",
        "kanban",
        "testing",
        "references",
        "presets",
      ];

      for (const dir of dirs) {
        const dirPath = join(testDir, ".project", dir);
        const stats = await stat(dirPath);
        expect(stats.isDirectory()).toBe(true);
      }
    });
  });

  describe("existing project handling", () => {
    test("fails if .project already exists", async () => {
      // First init
      await runInit(testDir);

      // Second init should fail
      const result = await runInit(testDir);
      expect(result.success).toBe(false);
      expect(result.message).toContain("already exist");
    });

    test("succeeds with --force flag", async () => {
      // First init
      await runInit(testDir);

      // Second init with force
      const result = await runInit(testDir, { force: true });
      expect(result.success).toBe(true);
    });
  });

  describe("with presets", () => {
    test("installs single preset", async () => {
      const result = await runInit(testDir, { presets: ["zig"] });

      expect(result.success).toBe(true);

      const presetDir = join(testDir, ".project", "presets", "zig");
      const stats = await stat(presetDir);
      expect(stats.isDirectory()).toBe(true);
    });

    test("installs multiple presets", async () => {
      const result = await runInit(testDir, {
        presets: ["zig", "typescript"],
      });

      expect(result.success).toBe(true);

      const zigDir = join(testDir, ".project", "presets", "zig");
      const tsDir = join(testDir, ".project", "presets", "typescript");

      const zigStats = await stat(zigDir);
      const tsStats = await stat(tsDir);

      expect(zigStats.isDirectory()).toBe(true);
      expect(tsStats.isDirectory()).toBe(true);
    });

    test("reports errors for unknown presets", async () => {
      const result = await runInit(testDir, { presets: ["unknown"] });

      expect(result.success).toBe(true); // Still succeeds overall
      expect(result.presetErrors).toBeDefined();
      expect(result.presetErrors!.length).toBeGreaterThan(0);
    });

    test("installs valid presets even if some fail", async () => {
      const result = await runInit(testDir, {
        presets: ["zig", "unknown"],
      });

      expect(result.success).toBe(true);

      // Zig should be installed
      const zigDir = join(testDir, ".project", "presets", "zig");
      const zigStats = await stat(zigDir);
      expect(zigStats.isDirectory()).toBe(true);

      // But we should have an error for unknown
      expect(result.presetErrors!.length).toBe(1);
    });
  });

  describe("output formatting", () => {
    test("formats success message", async () => {
      const result = await runInit(testDir);
      const output = formatInit(result);

      expect(output).toContain("✓");
      expect(output).toContain("consecrated");
      expect(output).toContain("Omnissiah");
    });

    test("formats failure message", async () => {
      await runInit(testDir);
      const result = await runInit(testDir); // Second init fails
      const output = formatInit(result);

      expect(output).toContain("✗");
      expect(output).toContain("already exist");
    });

    test("formats preset warnings", async () => {
      const result = await runInit(testDir, { presets: ["unknown"] });
      const output = formatInit(result);

      expect(output).toContain("warning");
    });
  });
});
