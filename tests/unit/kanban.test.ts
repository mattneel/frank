/**
 * Unit Tests for the Kanban Parser
 */

import { describe, test, expect } from "bun:test";
import {
  countTasks,
  extractCurrentTask,
  parseKanbanFile,
  formatRelativeTime,
} from "../../src/kanban";

describe("countTasks", () => {
  test("counts zero tasks in empty content", () => {
    expect(countTasks("# Backlog\n\nNo tasks here.")).toBe(0);
  });

  test("counts single task", () => {
    const content = `# Backlog

## [TASK-001] First Task

Description here.
`;
    expect(countTasks(content)).toBe(1);
  });

  test("counts multiple tasks", () => {
    const content = `# Backlog

## [TASK-001] First Task

Description.

## [TASK-002] Second Task

Another description.

## [TASK-003] Third Task

Yet another.
`;
    expect(countTasks(content)).toBe(3);
  });

  test("ignores non-task headers", () => {
    const content = `# Backlog

## [TASK-001] Real Task

## Not a Task

## [OTHER-002] Also Not a Task
`;
    expect(countTasks(content)).toBe(1);
  });
});

describe("extractCurrentTask", () => {
  test("returns null for empty content", () => {
    expect(extractCurrentTask("# In Progress\n\nNo tasks.")).toBeNull();
  });

  test("extracts task from content", () => {
    const content = `# In Progress

## [TASK-004] Implement user auth

Description here.
`;
    const task = extractCurrentTask(content);
    expect(task).not.toBeNull();
    expect(task!.id).toBe("TASK-004");
    expect(task!.title).toBe("Implement user auth");
  });

  test("extracts first task when multiple exist", () => {
    const content = `# In Progress

## [TASK-001] First

## [TASK-002] Second
`;
    const task = extractCurrentTask(content);
    expect(task!.id).toBe("TASK-001");
    expect(task!.title).toBe("First");
  });
});

describe("parseKanbanFile", () => {
  test("parses backlog file", () => {
    const content = `# Backlog

## [TASK-001] First

## [TASK-002] Second
`;
    const result = parseKanbanFile(content, "backlog");
    expect(result.count).toBe(2);
    expect(result.currentTask).toBeNull();
  });

  test("parses in-progress file with current task", () => {
    const content = `# In Progress

## [TASK-003] Current Work
`;
    const result = parseKanbanFile(content, "in-progress");
    expect(result.count).toBe(1);
    expect(result.currentTask).not.toBeNull();
    expect(result.currentTask!.id).toBe("TASK-003");
  });

  test("parses done file", () => {
    const content = `# Done

## [TASK-001] First Completed

## [TASK-002] Second Completed
`;
    const result = parseKanbanFile(content, "done");
    expect(result.count).toBe(2);
    expect(result.currentTask).toBeNull();
  });
});

describe("formatRelativeTime", () => {
  test("formats just now", () => {
    const now = new Date();
    expect(formatRelativeTime(now)).toBe("just now");
  });

  test("formats minutes ago", () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    expect(formatRelativeTime(fiveMinutesAgo)).toBe("5 minutes ago");
  });

  test("formats single minute", () => {
    const oneMinuteAgo = new Date(Date.now() - 1 * 60 * 1000);
    expect(formatRelativeTime(oneMinuteAgo)).toBe("1 minute ago");
  });

  test("formats hours ago", () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
    expect(formatRelativeTime(threeHoursAgo)).toBe("3 hours ago");
  });

  test("formats single hour", () => {
    const oneHourAgo = new Date(Date.now() - 1 * 60 * 60 * 1000);
    expect(formatRelativeTime(oneHourAgo)).toBe("1 hour ago");
  });

  test("formats days ago", () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(twoDaysAgo)).toBe("2 days ago");
  });

  test("formats single day", () => {
    const oneDayAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(oneDayAgo)).toBe("1 day ago");
  });
});
