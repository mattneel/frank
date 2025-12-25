/**
 * The add Command — Incorporation of Codices into Existing Projects
 */

import { access } from "fs/promises";
import { join } from "path";
import { resolvePreset, writePreset } from "../presets";

export interface AddResult {
  success: boolean;
  error?: string;
  presetName?: string;
}

const exists = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

export const runAdd = async (
  cwd: string,
  presetName: string
): Promise<AddResult> => {
  const projectDir = join(cwd, ".project");

  // Check if .project/ exists
  if (!(await exists(projectDir))) {
    return {
      success: false,
      error: "No .project/ found. This directory has not been consecrated. Run 'rtfct init' first.",
    };
  }

  // Check if preset is already incorporated
  const presetDir = join(projectDir, "presets", presetName);
  if (await exists(presetDir)) {
    return {
      success: false,
      error: `The Codex "${presetName}" is already incorporated. Each Codex may only be added once.`,
    };
  }

  // Resolve the preset
  const resolved = resolvePreset(presetName);
  if (resolved.error) {
    return {
      success: false,
      error: resolved.error,
    };
  }

  // Write the preset
  await writePreset(cwd, resolved.preset!);

  return {
    success: true,
    presetName,
  };
};
