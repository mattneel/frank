/**
 * The Add Command — Graft an Organ into an Existing Project
 *
 * Adds a preset to an already assembled laboratory.
 */

import { stat } from "fs/promises";
import { join } from "path";
import { resolvePreset, writePreset, isPresetInstalled } from "../presets";

export interface AddResult {
  success: boolean;
  message: string;
}

/**
 * Run the add command to graft an Organ.
 */
export const runAdd = async (
  targetDir: string,
  presetName: string
): Promise<AddResult> => {
  const projectDir = join(targetDir, ".project");

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

  // Resolve the preset
  const result = await resolvePreset(presetName);
  if (!result.success) {
    return {
      success: false,
      message: result.error,
    };
  }

  // Check if already installed
  if (await isPresetInstalled(targetDir, result.preset.name)) {
    return {
      success: false,
      message: `Organ '${presetName}' is already grafted into this project.`,
    };
  }

  // Write the preset
  await writePreset(targetDir, result.preset);

  return {
    success: true,
    message: `Organ '${presetName}' has been grafted.`,
  };
};

/**
 * Format the add result for CLI output.
 */
export const formatAdd = (result: AddResult): string => {
  if (result.success) {
    return `✓ ${result.message}\n\nIT'S ALIVE!`;
  } else {
    return `✗ ${result.message}`;
  }
};
