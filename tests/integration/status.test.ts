/**
 * Integration Tests for the Status Command
 */

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { runInit } from "../../src/commands/init";
import { runStatus, formatStatus } from "../../src/commands/status";

describe("status command", () => {
  let testDir: string;

  beforeEach(async () => {
    testDir = await mkdtemp("/tmp/frank-status-test-");
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  describe("without existing project", () => {
    test("fails if .project does not exist", async () => {
      const result = await runStatus(testDir);

      expect(result.success).toBe(false);
      expect(result.message).toContain("No .project/ folder found");
    });
  });

  describe("with existing project", () => {
    beforeEach(async () => {
      await runInit(testDir);
    });

    test("returns success", async () => {
      const result = await runStatus(testDir);
      expect(result.success).toBe(true);
    });

    test("returns project name", async () => {
      const result = await runStatus(testDir);
      expect(result.data).toBeDefined();
      expect(result.data!.projectName).toBeDefined();
    });

    test("counts tasks from default kanban files", async () => {
      const result = await runStatus(testDir);

      // Default template has 1 task in backlog
      expect(result.data!.backlogCount).toBe(1);
      expect(result.data!.inProgressCount).toBe(0);
      expect(result.data!.doneCount).toBe(0);
    });

    test("returns last activity date", async () => {
      const result = await runStatus(testDir);
      expect(result.data!.lastActivity).not.toBeNull();
    });
  });

  describe("with custom kanban content", () => {
    beforeEach(async () => {
      await runInit(testDir);
    });

    test("counts multiple backlog tasks", async () => {
      const backlogContent = `# Backlog

## [TASK-001] First Task

## [TASK-002] Second Task

## [TASK-003] Third Task
`;
      await writeFile(
        join(testDir, ".project", "kanban", "backlog.md"),
        backlogContent
      );

      const result = await runStatus(testDir);
      expect(result.data!.backlogCount).toBe(3);
    });

    test("extracts current task from in-progress", async () => {
      const inProgressContent = `# In Progress

## [TASK-004] Implement user auth

Working on it.
`;
      await writeFile(
        join(testDir, ".project", "kanban", "in-progress.md"),
        inProgressContent
      );

      const result = await runStatus(testDir);
      expect(result.data!.inProgressCount).toBe(1);
      expect(result.data!.currentTask).not.toBeNull();
      expect(result.data!.currentTask!.id).toBe("TASK-004");
      expect(result.data!.currentTask!.title).toBe("Implement user auth");
    });

    test("counts completed tasks", async () => {
      const doneContent = `# Done

## [TASK-001] First Completed

## [TASK-002] Second Completed
`;
      await writeFile(
        join(testDir, ".project", "kanban", "done.md"),
        doneContent
      );

      const result = await runStatus(testDir);
      expect(result.data!.doneCount).toBe(2);
    });
  });

  describe("output formatting", () => {
    beforeEach(async () => {
      await runInit(testDir);
    });

    test("formats success output", async () => {
      const result = await runStatus(testDir);
      const output = formatStatus(result);

      expect(output).toContain("frank:");
      expect(output).toContain("Work Queue");
      expect(output).toContain("Morgue:");
      expect(output).toContain("On The Slab:");
      expect(output).toContain("Reanimated:");
      expect(output).toContain("IT'S ALIVE!");
    });

    test("formats current task", async () => {
      const inProgressContent = `# In Progress

## [TASK-007] The Laboratory Task
`;
      await writeFile(
        join(testDir, ".project", "kanban", "in-progress.md"),
        inProgressContent
      );

      const result = await runStatus(testDir);
      const output = formatStatus(result);

      expect(output).toContain("[TASK-007]");
      expect(output).toContain("The Laboratory Task");
    });

    test("formats failure output", async () => {
      await rm(testDir, { recursive: true, force: true });
      testDir = await mkdtemp("/tmp/frank-status-test-");

      const result = await runStatus(testDir);
      const output = formatStatus(result);

      expect(output).toContain("✗");
    });
  });
});
