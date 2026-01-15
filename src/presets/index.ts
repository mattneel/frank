/**
 * The Preset System — Organ Resolution and Installation
 *
 * Resolves preset names to Organ content and writes them to projects.
 */

import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

import { BASE_PRESET } from "./base";
import { ZIG_PRESET } from "./zig";
import { TYPESCRIPT_PRESET } from "./typescript";
import { ELIXIR_PRESET } from "./elixir";
import { parseGitHubRef, resolveGitHubPreset } from "./github";

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

export type AsyncResolveResult = Promise<ResolveResult>;

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
 * Resolve a preset name to a Preset object (synchronous, built-in only).
 */
export const resolvePresetSync = (name: string): ResolveResult => {
  const lowerName = name.toLowerCase();

  if (lowerName in BUILT_IN_PRESETS) {
    return {
      success: true,
      preset: BUILT_IN_PRESETS[lowerName as BuiltInPresetName],
    };
  }

  return {
    success: false,
    error: `Unknown built-in Organ: ${name}. Available: base, zig, typescript, elixir`,
  };
};

/**
 * Resolve a preset name to a Preset object.
 * Supports built-in Organs, GitHub Organs (owner/repo), and local Organs.
 */
export const resolvePreset = async (name: string): AsyncResolveResult => {
  const lowerName = name.toLowerCase();

  // Check built-in Organs first
  if (lowerName in BUILT_IN_PRESETS) {
    return {
      success: true,
      preset: BUILT_IN_PRESETS[lowerName as BuiltInPresetName],
    };
  }

  // Check local paths (not yet supported)
  if (name.startsWith("./") || name.startsWith("/")) {
    return {
      success: false,
      error: `Local Organs not yet supported: ${name}`,
    };
  }

  // Check for GitHub Organ format (owner/repo or owner/repo@branch)
  if (name.includes("/")) {
    const ref = parseGitHubRef(name);
    if (ref) {
      return await resolveGitHubPreset(name);
    }
    return {
      success: false,
      error: `Invalid GitHub Organ format: ${name}. Use "owner/repo" or "owner/repo@branch".`,
    };
  }

  return {
    success: false,
    error: `Unknown Organ: ${name}. Available: base, zig, typescript, elixir, or use owner/repo for GitHub Organs.`,
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
