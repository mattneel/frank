/**
 * The Add Command — Incorporate a Codex into an Existing Project
 *
 * Adds a preset to an already consecrated project.
 */

import { stat } from "fs/promises";
import { join } from "path";
import { resolvePreset, writePreset, isPresetInstalled } from "../presets";

export interface AddResult {
  success: boolean;
  message: string;
}

/**
 * Run the add command to incorporate a preset.
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

  // Resolve the preset
  const result = resolvePreset(presetName);
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
      message: `Preset '${presetName}' is already incorporated into this project.`,
    };
  }

  // Write the preset
  await writePreset(targetDir, result.preset);

  return {
    success: true,
    message: `Codex '${presetName}' has been incorporated.`,
  };
};

/**
 * Format the add result for CLI output.
 */
export const formatAdd = (result: AddResult): string => {
  if (result.success) {
    return `✓ ${result.message}\n\nThe Omnissiah provides.`;
  } else {
    return `✗ ${result.message}`;
  }
};
