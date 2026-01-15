/**
 * The Status Command — Check Vital Signs
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
 * Run the status command to check vital signs.
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
          "No .project/ folder found. Run 'frank init' first to assemble the laboratory.",
      };
    }
  } catch {
    return {
      success: false,
      message:
        "No .project/ folder found. Run 'frank init' first to assemble the laboratory.",
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

  lines.push(`frank: ${data.projectName}`);
  lines.push("");
  lines.push("══════════════════════════════════");
  lines.push("  The Work Queue");
  lines.push("══════════════════════════════════");
  lines.push(
    `  Morgue:       ${data.backlogCount} bod${data.backlogCount === 1 ? "y" : "ies"} awaiting`
  );
  lines.push(
    `  On The Slab:  ${data.inProgressCount} bod${data.inProgressCount === 1 ? "y" : "ies"} in progress`
  );

  if (data.currentTask) {
    lines.push(`    → [${data.currentTask.id}] ${data.currentTask.title}`);
  }

  lines.push(
    `  Reanimated:   ${data.doneCount} creature${data.doneCount === 1 ? "" : "s"} risen`
  );
  lines.push("══════════════════════════════════");
  lines.push("");

  if (data.lastActivity) {
    lines.push(`Last activity: ${formatRelativeTime(data.lastActivity)}`);
  } else {
    lines.push("Last activity: unknown");
  }

  lines.push("");
  lines.push("IT'S ALIVE!");

  return lines.join("\n");
};
