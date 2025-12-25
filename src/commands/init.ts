/**
 * The init Command — Consecration of a New Project
 */

import { mkdir, rm, access } from "fs/promises";
import { join } from "path";
import type { ParsedFlags } from "../args";
import {
  PROTOCOL_MD,
  THEOLOGY_MD,
  KICKSTART_MD,
  GUARDRAILS_MD,
  BACKLOG_MD,
  IN_PROGRESS_MD,
  DONE_MD,
} from "../templates";

interface InitResult {
  success: boolean;
  error?: string;
}

const exists = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

const writeFile = async (path: string, content: string): Promise<void> => {
  await Bun.write(path, content);
};

export const runInit = async (
  cwd: string,
  flags: ParsedFlags
): Promise<InitResult> => {
  const projectDir = join(cwd, ".project");

  // Check if .project/ already exists
  if (await exists(projectDir)) {
    if (flags.force) {
      // Purify existing .project/
      await rm(projectDir, { recursive: true, force: true });
    } else {
      return {
        success: false,
        error: `The Sacred Texts already exist at ${projectDir}. Use --force to purify and recreate.`,
      };
    }
  }

  // Create the holy directory structure
  const directories = [
    ".project",
    ".project/kanban",
    ".project/specs",
    ".project/design",
    ".project/testing",
    ".project/adrs",
    ".project/references",
    ".project/presets",
  ];

  for (const dir of directories) {
    await mkdir(join(cwd, dir), { recursive: true });
  }

  // Inscribe the Sacred Texts
  const files: Array<[string, string]> = [
    [".project/protocol.md", PROTOCOL_MD],
    [".project/theology.md", THEOLOGY_MD],
    [".project/kickstart.md", KICKSTART_MD],
    [".project/guardrails.md", GUARDRAILS_MD],
    [".project/kanban/backlog.md", BACKLOG_MD],
    [".project/kanban/in-progress.md", IN_PROGRESS_MD],
    [".project/kanban/done.md", DONE_MD],
  ];

  for (const [filePath, content] of files) {
    await writeFile(join(cwd, filePath), content);
  }

  return { success: true };
};
