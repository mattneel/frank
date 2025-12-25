/**
 * The Init Command — Consecrate a New Project
 *
 * Creates the .project/ folder structure with Sacred Texts.
 */

import { mkdir, writeFile, rm, stat } from "fs/promises";
import { join } from "path";
import {
  PROTOCOL_MD,
  THEOLOGY_MD,
  KICKSTART_MD,
  GUARDRAILS_MD,
  BACKLOG_MD,
  IN_PROGRESS_MD,
  DONE_MD,
} from "../templates";
import { resolvePreset, writePreset } from "../presets";

export interface InitOptions {
  force?: boolean;
  presets?: string[];
}

export interface InitResult {
  success: boolean;
  message: string;
  presetErrors?: string[];
}

/**
 * Run the init command to consecrate a project.
 */
export const runInit = async (
  targetDir: string,
  options: InitOptions = {}
): Promise<InitResult> => {
  const projectDir = join(targetDir, ".project");

  // Check if .project/ already exists
  try {
    const stats = await stat(projectDir);
    if (stats.isDirectory()) {
      if (options.force) {
        // Purify existing .project/
        await rm(projectDir, { recursive: true });
      } else {
        return {
          success: false,
          message:
            "The .project/ folder already exists. Use --force to purify and recreate.",
        };
      }
    }
  } catch {
    // Directory doesn't exist, which is what we want
  }

  // Create the directory structure
  const directories = [
    projectDir,
    join(projectDir, "specs"),
    join(projectDir, "design"),
    join(projectDir, "adrs"),
    join(projectDir, "kanban"),
    join(projectDir, "testing"),
    join(projectDir, "references"),
    join(projectDir, "presets"),
  ];

  for (const dir of directories) {
    await mkdir(dir, { recursive: true });
  }

  // Write the Sacred Texts
  const files = [
    { path: join(projectDir, "protocol.md"), content: PROTOCOL_MD },
    { path: join(projectDir, "theology.md"), content: THEOLOGY_MD },
    { path: join(projectDir, "kickstart.md"), content: KICKSTART_MD },
    { path: join(projectDir, "guardrails.md"), content: GUARDRAILS_MD },
    { path: join(projectDir, "kanban", "backlog.md"), content: BACKLOG_MD },
    {
      path: join(projectDir, "kanban", "in-progress.md"),
      content: IN_PROGRESS_MD,
    },
    { path: join(projectDir, "kanban", "done.md"), content: DONE_MD },
  ];

  for (const file of files) {
    await writeFile(file.path, file.content);
  }

  // Handle presets if specified
  const presetErrors: string[] = [];
  if (options.presets && options.presets.length > 0) {
    for (const presetName of options.presets) {
      const result = resolvePreset(presetName);
      if (result.success) {
        await writePreset(targetDir, result.preset);
      } else {
        presetErrors.push(result.error);
      }
    }
  }

  if (presetErrors.length > 0) {
    return {
      success: true,
      message:
        "Project consecrated with warnings. Some presets failed to install.",
      presetErrors,
    };
  }

  return {
    success: true,
    message: "Project consecrated. The Sacred Texts have been inscribed.",
  };
};

/**
 * Format the init result for CLI output.
 */
export const formatInit = (result: InitResult): string => {
  const lines: string[] = [];

  if (result.success) {
    lines.push("✓ " + result.message);
    lines.push("");
    lines.push("The Omnissiah provides.");
  } else {
    lines.push("✗ " + result.message);
  }

  if (result.presetErrors && result.presetErrors.length > 0) {
    lines.push("");
    lines.push("Preset warnings:");
    for (const error of result.presetErrors) {
      lines.push("  - " + error);
    }
  }

  return lines.join("\n");
};
