/**
 * Unit Tests for the Kanban Parser
 *
 * These tests ensure robust parsing of kanban markdown files,
 * handling various edge cases and malformed input gracefully.
 */

import { describe, test, expect } from "bun:test";
import {
  countTasks,
  extractCurrentTask,
  parseKanbanFile,
  formatRelativeTime,
} from "../../src/kanban";

describe("countTasks", () => {
  describe("basic counting", () => {
    test("counts zero tasks in empty string", () => {
      expect(countTasks("")).toBe(0);
    });

    test("counts zero tasks in whitespace-only content", () => {
      expect(countTasks("   \n\n\t\n   ")).toBe(0);
    });

    test("counts zero tasks when no task headers exist", () => {
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
  });

  describe("task ID formats", () => {
    test("handles single-digit task IDs", () => {
      expect(countTasks("## [TASK-1] Single digit")).toBe(1);
    });

    test("handles double-digit task IDs", () => {
      expect(countTasks("## [TASK-42] Double digit")).toBe(1);
    });

    test("handles triple-digit task IDs", () => {
      expect(countTasks("## [TASK-100] Triple digit")).toBe(1);
    });

    test("handles four-digit task IDs", () => {
      expect(countTasks("## [TASK-1234] Four digit")).toBe(1);
    });

    test("handles leading zeros in task IDs", () => {
      expect(countTasks("## [TASK-001] Leading zeros")).toBe(1);
      expect(countTasks("## [TASK-0001] More zeros")).toBe(1);
    });

    test("counts mixed ID formats", () => {
      const content = `
## [TASK-1] First
## [TASK-02] Second
## [TASK-003] Third
## [TASK-1000] Fourth
`;
      expect(countTasks(content)).toBe(4);
    });
  });

  describe("non-task headers", () => {
    test("ignores level 1 headers", () => {
      expect(countTasks("# [TASK-001] Not a task")).toBe(0);
    });

    test("ignores level 3 headers", () => {
      expect(countTasks("### [TASK-001] Not a task")).toBe(0);
    });

    test("ignores headers without brackets", () => {
      expect(countTasks("## TASK-001 Missing brackets")).toBe(0);
    });

    test("ignores headers with wrong prefix", () => {
      expect(countTasks("## [BUG-001] Wrong prefix")).toBe(0);
      expect(countTasks("## [ISSUE-001] Wrong prefix")).toBe(0);
      expect(countTasks("## [OTHER-001] Wrong prefix")).toBe(0);
    });

    test("ignores headers without numbers", () => {
      expect(countTasks("## [TASK-ABC] No numbers")).toBe(0);
      expect(countTasks("## [TASK-] Empty ID")).toBe(0);
    });

    test("ignores plain ## headers", () => {
      const content = `
## Regular Header
## Another Header
## [TASK-001] Real Task
`;
      expect(countTasks(content)).toBe(1);
    });

    test("ignores headers inside code blocks", () => {
      const content = `
\`\`\`markdown
## [TASK-001] Inside code block
\`\`\`

## [TASK-002] Real task
`;
      expect(countTasks(content)).toBe(1);
    });

    test("ignores headers inside tilde code blocks", () => {
      const content = `
~~~
## [TASK-001] Inside tilde block
~~~

## [TASK-002] Real task
`;
      expect(countTasks(content)).toBe(1);
    });

    test("ignores headers inside nested code blocks", () => {
      const content = `
\`\`\`\`
## [TASK-001] Inside quadruple backticks
\`\`\`
Still inside
\`\`\`
\`\`\`\`

## [TASK-002] Real task
`;
      expect(countTasks(content)).toBe(1);
    });

    test("handles multiple code blocks", () => {
      const content = `
## [TASK-001] Real task 1

\`\`\`
## [TASK-002] Fake task
\`\`\`

## [TASK-003] Real task 2

\`\`\`bash
## [TASK-004] Another fake
\`\`\`

## [TASK-005] Real task 3
`;
      expect(countTasks(content)).toBe(3);
    });
  });

  describe("whitespace handling", () => {
    test("handles no space after ##", () => {
      // Current pattern requires space after ##
      expect(countTasks("##[TASK-001] No space")).toBe(0);
    });

    test("handles multiple spaces after ##", () => {
      expect(countTasks("##  [TASK-001] Multiple spaces")).toBe(0);
    });

    test("handles trailing whitespace", () => {
      expect(countTasks("## [TASK-001] Title   \n")).toBe(1);
    });

    test("handles Windows line endings", () => {
      expect(countTasks("## [TASK-001] First\r\n## [TASK-002] Second\r\n")).toBe(2);
    });

    test("handles mixed line endings", () => {
      expect(countTasks("## [TASK-001] First\n## [TASK-002] Second\r\n## [TASK-003] Third\r")).toBe(3);
    });
  });

  describe("real-world content", () => {
    test("handles typical backlog file", () => {
      const content = `# The Morgue — Bodies Awaiting Resurrection

*These works await the Monster. They shall be completed in order of priority.*

---

## [TASK-001] First Task

Describe the first task here.

**Acceptance Trial:** How do we verify this is complete?

---

*The Morgue is long. The Monster is tireless. Begin.*
`;
      expect(countTasks(content)).toBe(1);
    });

    test("handles typical done file with many tasks", () => {
      const content = `# Reanimated — Completed Works

*Here we record the Monster's work.*

---

## [TASK-001] First Completed

**Completed:** 2025-12-25

Details.

---

## [TASK-002] Second Completed

**Completed:** 2025-12-26

Details.

---

## [TASK-003] Third Completed

**Completed:** 2025-12-27

Details.
`;
      expect(countTasks(content)).toBe(3);
    });

    test("handles empty in-progress file", () => {
      const content = `# On The Slab — Current Work

*The Monster focuses on one body at a time.*

---

*No body currently on the slab. Select from the Morgue.*

---
`;
      expect(countTasks(content)).toBe(0);
    });
  });
});

describe("extractCurrentTask", () => {
  describe("basic extraction", () => {
    test("returns null for empty content", () => {
      expect(extractCurrentTask("")).toBeNull();
    });

    test("returns null for whitespace-only content", () => {
      expect(extractCurrentTask("   \n\n\t\n   ")).toBeNull();
    });

    test("returns null when no task headers exist", () => {
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

  describe("title handling", () => {
    test("trims whitespace from title", () => {
      const content = "## [TASK-001]   Lots of spaces   ";
      const task = extractCurrentTask(content);
      expect(task!.title).toBe("Lots of spaces");
    });

    test("handles title with special characters", () => {
      const content = "## [TASK-001] Fix bug: can't login (urgent!)";
      const task = extractCurrentTask(content);
      expect(task!.title).toBe("Fix bug: can't login (urgent!)");
    });

    test("handles title with markdown formatting", () => {
      const content = "## [TASK-001] Add **bold** and `code` support";
      const task = extractCurrentTask(content);
      expect(task!.title).toBe("Add **bold** and `code` support");
    });

    test("handles title with numbers", () => {
      const content = "## [TASK-001] Fix issue #123";
      const task = extractCurrentTask(content);
      expect(task!.title).toBe("Fix issue #123");
    });

    test("handles title with dashes and underscores", () => {
      const content = "## [TASK-001] refactor_user-service_module";
      const task = extractCurrentTask(content);
      expect(task!.title).toBe("refactor_user-service_module");
    });

    test("handles unicode in title", () => {
      const content = "## [TASK-001] Add emoji support 🎉";
      const task = extractCurrentTask(content);
      expect(task!.title).toBe("Add emoji support 🎉");
    });

    test("handles very long title", () => {
      const longTitle = "A".repeat(200);
      const content = `## [TASK-001] ${longTitle}`;
      const task = extractCurrentTask(content);
      expect(task!.title).toBe(longTitle);
    });
  });

  describe("ID extraction", () => {
    test("extracts single-digit ID", () => {
      const task = extractCurrentTask("## [TASK-1] Title");
      expect(task!.id).toBe("TASK-1");
    });

    test("extracts ID with leading zeros", () => {
      const task = extractCurrentTask("## [TASK-007] Title");
      expect(task!.id).toBe("TASK-007");
    });

    test("extracts large ID", () => {
      const task = extractCurrentTask("## [TASK-99999] Title");
      expect(task!.id).toBe("TASK-99999");
    });
  });

  describe("real-world content", () => {
    test("handles typical in-progress file", () => {
      const content = `# On The Slab — Current Work

*The Monster focuses on one body at a time. Multitasking is malpractice.*

---

## [TASK-042] Implement authentication flow

Working on OAuth2 integration with Google.

**Progress:**
- [x] Set up OAuth client
- [ ] Implement callback handler
- [ ] Store tokens securely

---

*Focus is essential. Complete the current work before selecting another.*
`;
      const task = extractCurrentTask(content);
      expect(task).not.toBeNull();
      expect(task!.id).toBe("TASK-042");
      expect(task!.title).toBe("Implement authentication flow");
    });

    test("handles empty slab message", () => {
      const content = `# On The Slab — Current Work

*No body currently on the slab. Select from the Morgue.*
`;
      expect(extractCurrentTask(content)).toBeNull();
    });
  });
});

describe("parseKanbanFile", () => {
  describe("backlog parsing", () => {
    test("parses empty backlog", () => {
      const result = parseKanbanFile("# Backlog\n\nEmpty.", "backlog");
      expect(result.count).toBe(0);
      expect(result.currentTask).toBeNull();
    });

    test("parses backlog with tasks", () => {
      const content = `# Backlog

## [TASK-001] First

## [TASK-002] Second
`;
      const result = parseKanbanFile(content, "backlog");
      expect(result.count).toBe(2);
      expect(result.currentTask).toBeNull();
    });

    test("does not extract current task from backlog", () => {
      const content = `## [TASK-001] Task in backlog`;
      const result = parseKanbanFile(content, "backlog");
      expect(result.currentTask).toBeNull();
    });
  });

  describe("in-progress parsing", () => {
    test("parses empty in-progress", () => {
      const result = parseKanbanFile("# In Progress\n\nNone.", "in-progress");
      expect(result.count).toBe(0);
      expect(result.currentTask).toBeNull();
    });

    test("parses in-progress with current task", () => {
      const content = `# In Progress

## [TASK-003] Current Work
`;
      const result = parseKanbanFile(content, "in-progress");
      expect(result.count).toBe(1);
      expect(result.currentTask).not.toBeNull();
      expect(result.currentTask!.id).toBe("TASK-003");
    });

    test("extracts first task as current when multiple exist", () => {
      const content = `
## [TASK-001] First (should be current)
## [TASK-002] Second (should be ignored)
`;
      const result = parseKanbanFile(content, "in-progress");
      expect(result.count).toBe(2);
      expect(result.currentTask!.id).toBe("TASK-001");
    });
  });

  describe("done parsing", () => {
    test("parses empty done", () => {
      const result = parseKanbanFile("# Done\n\nNone yet.", "done");
      expect(result.count).toBe(0);
      expect(result.currentTask).toBeNull();
    });

    test("parses done with completed tasks", () => {
      const content = `# Done

## [TASK-001] First Completed

## [TASK-002] Second Completed
`;
      const result = parseKanbanFile(content, "done");
      expect(result.count).toBe(2);
      expect(result.currentTask).toBeNull();
    });

    test("does not extract current task from done", () => {
      const content = `## [TASK-001] Completed task`;
      const result = parseKanbanFile(content, "done");
      expect(result.currentTask).toBeNull();
    });
  });

  describe("lastModified", () => {
    test("always returns null (set by caller)", () => {
      const result = parseKanbanFile("## [TASK-001] Test", "backlog");
      expect(result.lastModified).toBeNull();
    });
  });
});

describe("formatRelativeTime", () => {
  describe("seconds", () => {
    test("formats just now for current time", () => {
      const now = new Date();
      expect(formatRelativeTime(now)).toBe("just now");
    });

    test("formats just now for 30 seconds ago", () => {
      const thirtySecsAgo = new Date(Date.now() - 30 * 1000);
      expect(formatRelativeTime(thirtySecsAgo)).toBe("just now");
    });

    test("formats just now for 59 seconds ago", () => {
      const fiftyNineSecsAgo = new Date(Date.now() - 59 * 1000);
      expect(formatRelativeTime(fiftyNineSecsAgo)).toBe("just now");
    });
  });

  describe("minutes", () => {
    test("formats 1 minute ago", () => {
      const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
      expect(formatRelativeTime(oneMinuteAgo)).toBe("1 minute ago");
    });

    test("formats 2 minutes ago", () => {
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
      expect(formatRelativeTime(twoMinutesAgo)).toBe("2 minutes ago");
    });

    test("formats 59 minutes ago", () => {
      const fiftyNineMinutesAgo = new Date(Date.now() - 59 * 60 * 1000);
      expect(formatRelativeTime(fiftyNineMinutesAgo)).toBe("59 minutes ago");
    });
  });

  describe("hours", () => {
    test("formats 1 hour ago", () => {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      expect(formatRelativeTime(oneHourAgo)).toBe("1 hour ago");
    });

    test("formats 2 hours ago", () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      expect(formatRelativeTime(twoHoursAgo)).toBe("2 hours ago");
    });

    test("formats 23 hours ago", () => {
      const twentyThreeHoursAgo = new Date(Date.now() - 23 * 60 * 60 * 1000);
      expect(formatRelativeTime(twentyThreeHoursAgo)).toBe("23 hours ago");
    });
  });

  describe("days", () => {
    test("formats 1 day ago", () => {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(oneDayAgo)).toBe("1 day ago");
    });

    test("formats 2 days ago", () => {
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(twoDaysAgo)).toBe("2 days ago");
    });

    test("formats 30 days ago", () => {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(thirtyDaysAgo)).toBe("30 days ago");
    });

    test("formats 365 days ago", () => {
      const yearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(yearAgo)).toBe("365 days ago");
    });
  });

  describe("edge cases", () => {
    test("handles boundary between seconds and minutes", () => {
      const sixtySecsAgo = new Date(Date.now() - 60 * 1000);
      expect(formatRelativeTime(sixtySecsAgo)).toBe("1 minute ago");
    });

    test("handles boundary between minutes and hours", () => {
      const sixtyMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);
      expect(formatRelativeTime(sixtyMinutesAgo)).toBe("1 hour ago");
    });

    test("handles boundary between hours and days", () => {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(twentyFourHoursAgo)).toBe("1 day ago");
    });
  });
});
