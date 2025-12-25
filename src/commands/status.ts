/**
 * The Status Command — Reveal the State of the Litany of Tasks
 *
 * Parses kanban markdown and displays project status.
 */

import { readFile, stat } from "fs/promises";
import { join } from "path";
import { parseKanbanFile, formatRelativeTime, type Task } from "../kanban";

export interface StatusResult {
  success: boolean;
  message?: string;
  data?: {
    projectName: string;
    backlogCount: number;
    inProgressCount: number;
    doneCount: number;
    currentTask: Task | null;
    lastActivity: Date | null;
  };
}

/**
 * Helper to check if date a is newer than date b.
 */
const isNewer = (a: Date, b: Date | null): boolean => {
  if (b === null) return true;
  return a.getTime() > b.getTime();
};

/**
 * Run the status command to display project state.
 */
export const runStatus = async (targetDir: string): Promise<StatusResult> => {
  const projectDir = join(targetDir, ".project");
  const kanbanDir = join(projectDir, "kanban");

  // Check if .project/ exists
  try {
    const stats = await stat(projectDir);
    if (!stats.isDirectory()) {
      return {
        success: false,
        message:
          "No .project/ folder found. Run 'rtfct init' first to consecrate the project.",
      };
    }
  } catch {
    return {
      success: false,
      message:
        "No .project/ folder found. Run 'rtfct init' first to consecrate the project.",
    };
  }

  // Get project name from directory
  const projectName = targetDir.split("/").pop() || "unknown";

  // Parse kanban files
  let backlogCount = 0;
  let inProgressCount = 0;
  let doneCount = 0;
  let currentTask: Task | null = null;
  let lastActivity: Date | null = null;

  try {
    const backlogPath = join(kanbanDir, "backlog.md");
    const backlogContent = await readFile(backlogPath, "utf-8");
    const backlogStats = await stat(backlogPath);
    const backlogResult = parseKanbanFile(backlogContent, "backlog");
    backlogCount = backlogResult.count;
    if (isNewer(backlogStats.mtime, lastActivity)) {
      lastActivity = backlogStats.mtime;
    }
  } catch {
    // File doesn't exist or isn't readable
  }

  try {
    const inProgressPath = join(kanbanDir, "in-progress.md");
    const inProgressContent = await readFile(inProgressPath, "utf-8");
    const inProgressStats = await stat(inProgressPath);
    const inProgressResult = parseKanbanFile(inProgressContent, "in-progress");
    inProgressCount = inProgressResult.count;
    currentTask = inProgressResult.currentTask;
    if (isNewer(inProgressStats.mtime, lastActivity)) {
      lastActivity = inProgressStats.mtime;
    }
  } catch {
    // File doesn't exist or isn't readable
  }

  try {
    const donePath = join(kanbanDir, "done.md");
    const doneContent = await readFile(donePath, "utf-8");
    const doneStats = await stat(donePath);
    const doneResult = parseKanbanFile(doneContent, "done");
    doneCount = doneResult.count;
    if (isNewer(doneStats.mtime, lastActivity)) {
      lastActivity = doneStats.mtime;
    }
  } catch {
    // File doesn't exist or isn't readable
  }

  return {
    success: true,
    data: {
      projectName,
      backlogCount,
      inProgressCount,
      doneCount,
      currentTask,
      lastActivity,
    },
  };
};

/**
 * Format the status result for CLI output.
 */
export const formatStatus = (result: StatusResult): string => {
  if (!result.success) {
    return `✗ ${result.message}`;
  }

  const data = result.data!;
  const lines: string[] = [];

  lines.push(`rtfct: ${data.projectName}`);
  lines.push("");
  lines.push("══════════════════════════════════");
  lines.push("  The Litany of Tasks");
  lines.push("══════════════════════════════════");
  lines.push(
    `  Backlog:      ${data.backlogCount} unordained task${data.backlogCount === 1 ? "" : "s"}`
  );
  lines.push(
    `  In Progress:  ${data.inProgressCount} ordained task${data.inProgressCount === 1 ? "" : "s"}`
  );

  if (data.currentTask) {
    lines.push(`    → [${data.currentTask.id}] ${data.currentTask.title}`);
  }

  lines.push(
    `  Completed:    ${data.doneCount} work${data.doneCount === 1 ? "" : "s"} done`
  );
  lines.push("══════════════════════════════════");
  lines.push("");

  if (data.lastActivity) {
    lines.push(`Last activity: ${formatRelativeTime(data.lastActivity)}`);
  } else {
    lines.push("Last activity: unknown");
  }

  lines.push("");
  lines.push("The Omnissiah provides.");

  return lines.join("\n");
};
