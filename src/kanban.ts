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
 * Count the number of tasks in a kanban markdown file.
 * Tasks are identified by ## [TASK-NNN] headers.
 */
export const countTasks = (content: string): number => {
  const taskPattern = /^## \[TASK-\d+\]/gm;
  const matches = content.match(taskPattern);
  return matches ? matches.length : 0;
};

/**
 * Extract the current task from an in-progress kanban file.
 * Returns the first task found, or null if none.
 */
export const extractCurrentTask = (content: string): Task | null => {
  const taskPattern = /^## \[(TASK-\d+)\]\s+(.+)$/m;
  const match = content.match(taskPattern);

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
