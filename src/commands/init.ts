/**
 * The Init Command — Consecrate a New Project
 *
 * Creates the .project/ folder structure with Sacred Texts.
 */

import { mkdir, writeFile, rm, stat } from "fs/promises";
import { join } from "path";
import { resolvePreset, writePreset, BASE_PRESET } from "../presets";

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

  // Write the Sacred Texts from the Base Codex
  for (const file of BASE_PRESET.files) {
    const filePath = join(projectDir, file.path);
    const fileDir = join(filePath, "..");
    await mkdir(fileDir, { recursive: true });
    await writeFile(filePath, file.content);
  }

  // Install the Base Codex as a preset (for manifest tracking)
  await writePreset(targetDir, BASE_PRESET);

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
