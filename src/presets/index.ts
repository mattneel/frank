/**
 * The Preset Resolver — Locator of the Sacred Codices
 */

import { mkdir } from "fs/promises";
import { join } from "path";
import { zigCodex } from "./zig";
import { typescriptCodex } from "./typescript";
import { elixirCodex } from "./elixir";

export interface PresetFile {
  path: string;
  content: string;
}

export interface Preset {
  name: string;
  files: PresetFile[];
}

type BuiltInPresetName = "zig" | "typescript" | "elixir";

const BUILT_IN_PRESETS: Record<BuiltInPresetName, () => Preset> = {
  zig: zigCodex,
  typescript: typescriptCodex,
  elixir: elixirCodex,
};

const isBuiltInPreset = (name: string): name is BuiltInPresetName => {
  return name in BUILT_IN_PRESETS;
};

export interface ResolveResult {
  preset?: Preset;
  error?: string;
}

export const resolvePreset = (name: string): ResolveResult => {
  // Check if it's a built-in preset
  if (isBuiltInPreset(name)) {
    return { preset: BUILT_IN_PRESETS[name]() };
  }

  // Check if it's a GitHub preset (contains /)
  if (name.includes("/")) {
    return {
      error: `GitHub presets are not yet implemented. The Codex "${name}" awaits future manifestation.`,
    };
  }

  // Check if it's a local path
  if (name.startsWith("./") || name.startsWith("/")) {
    return {
      error: `Local presets are not yet implemented. The path "${name}" awaits future manifestation.`,
    };
  }

  // Unknown preset
  return {
    error: `Unknown Codex: "${name}". Available built-in Codices: ${Object.keys(BUILT_IN_PRESETS).join(", ")}`,
  };
};

export const writePreset = async (
  projectDir: string,
  preset: Preset
): Promise<void> => {
  const presetDir = join(projectDir, ".project/presets", preset.name);

  for (const file of preset.files) {
    const filePath = join(presetDir, file.path);
    const dirPath = join(filePath, "..");
    await mkdir(dirPath, { recursive: true });
    await Bun.write(filePath, file.content);
  }
};
