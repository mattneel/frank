/**
 * The Preset System — Codex Resolution and Installation
 *
 * Resolves preset names to Codex content and writes them to projects.
 */

import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

import { BASE_PRESET } from "./base";
import { ZIG_PRESET } from "./zig";
import { TYPESCRIPT_PRESET } from "./typescript";
import { ELIXIR_PRESET } from "./elixir";

export interface PresetFile {
  path: string;
  content: string;
}

export interface Preset {
  name: string;
  manifest: {
    name: string;
    version: string;
    description: string;
    depends?: string[];
    generated_paths: string[];
  };
  files: PresetFile[];
}

export type ResolveResult =
  | { success: true; preset: Preset }
  | { success: false; error: string };

type BuiltInPresetName = "base" | "zig" | "typescript" | "elixir";

const BUILT_IN_PRESETS: Record<BuiltInPresetName, Preset> = {
  base: BASE_PRESET,
  zig: ZIG_PRESET,
  typescript: TYPESCRIPT_PRESET,
  elixir: ELIXIR_PRESET,
};

// Re-export base preset for direct use by init command
export { BASE_PRESET } from "./base";

/**
 * Resolve a preset name to a Preset object.
 * Currently only supports built-in presets.
 */
export const resolvePreset = (name: string): ResolveResult => {
  const lowerName = name.toLowerCase();

  if (lowerName in BUILT_IN_PRESETS) {
    return {
      success: true,
      preset: BUILT_IN_PRESETS[lowerName as BuiltInPresetName],
    };
  }

  // Future: Support local and GitHub presets
  // Check local paths first (they also contain "/")
  if (name.startsWith("./") || name.startsWith("/")) {
    return {
      success: false,
      error: `Local presets not yet supported: ${name}`,
    };
  }

  if (name.includes("/")) {
    return {
      success: false,
      error: `GitHub presets not yet supported: ${name}`,
    };
  }

  return {
    success: false,
    error: `Unknown preset: ${name}. Available: base, zig, typescript, elixir`,
  };
};

/**
 * Write a preset to a project's .project/presets/ directory.
 */
export const writePreset = async (
  projectDir: string,
  preset: Preset
): Promise<void> => {
  const presetDir = join(projectDir, ".project", "presets", preset.name);

  // Create the preset directory
  await mkdir(presetDir, { recursive: true });

  // Write the manifest
  await writeFile(
    join(presetDir, "manifest.json"),
    JSON.stringify(preset.manifest, null, 2)
  );

  // Write all preset files
  for (const file of preset.files) {
    const filePath = join(presetDir, file.path);
    const fileDir = join(filePath, "..");
    await mkdir(fileDir, { recursive: true });
    await writeFile(filePath, file.content);
  }
};

/**
 * Check if a preset is already installed in a project.
 */
export const isPresetInstalled = async (
  projectDir: string,
  presetName: string
): Promise<boolean> => {
  const presetDir = join(projectDir, ".project", "presets", presetName);

  try {
    const { stat } = await import("fs/promises");
    const stats = await stat(presetDir);
    return stats.isDirectory();
  } catch {
    return false;
  }
};
