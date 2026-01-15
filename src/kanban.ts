/**
 * The Kanban Parser — Reads the Litany of Tasks
 *
 * Parses kanban markdown files to extract task information.
 */

export interface Task {
  id: string;
  title: string;
}

export interface KanbanFileResult {
  count: number;
  currentTask: Task | null;
  lastModified: Date | null;
}

/**
 * Remove code blocks from content to avoid matching inside them.
 */
const stripCodeBlocks = (content: string): string => {
  // Remove fenced code blocks (``` or ~~~)
  return content.replace(/^(`{3,}|~{3,}).*$[\s\S]*?^\1\s*$/gm, "");
};

/**
 * Count the number of tasks in a kanban markdown file.
 * Tasks are identified by ## [TASK-NNN] headers.
 * Ignores tasks inside code blocks.
 */
export const countTasks = (content: string): number => {
  const stripped = stripCodeBlocks(content);
  const taskPattern = /^## \[TASK-\d+\]/gm;
  const matches = stripped.match(taskPattern);
  return matches ? matches.length : 0;
};

/**
 * Extract the current task from an in-progress kanban file.
 * Returns the first task found, or null if none.
 * Ignores tasks inside code blocks.
 */
export const extractCurrentTask = (content: string): Task | null => {
  const stripped = stripCodeBlocks(content);
  const taskPattern = /^## \[(TASK-\d+)\]\s+(.+)$/m;
  const match = stripped.match(taskPattern);

  if (!match) {
    return null;
  }

  return {
    id: match[1],
    title: match[2].trim(),
  };
};

/**
 * Parse a kanban file and return structured information.
 */
export const parseKanbanFile = (
  content: string,
  type: "backlog" | "in-progress" | "done"
): KanbanFileResult => {
  const count = countTasks(content);
  const currentTask = type === "in-progress" ? extractCurrentTask(content) : null;

  return {
    count,
    currentTask,
    lastModified: null, // Set by caller from file stats
  };
};

/**
 * Format a relative time string from a date.
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return "just now";
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  } else {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }
};
