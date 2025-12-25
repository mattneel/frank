/**
 * The Manifest Reader — Interprets the Codex Declarations
 *
 * Reads preset manifests to understand generated paths and dependencies.
 */

import { readdir, readFile } from "fs/promises";
import { join } from "path";

export interface PresetManifest {
  name: string;
  version: string;
  description: string;
  depends?: string[];
  generated_paths: string[];
}

/**
 * Read a preset manifest from a preset directory.
 */
export const readManifest = async (
  presetDir: string
): Promise<PresetManifest | null> => {
  const manifestPath = join(presetDir, "manifest.json");

  try {
    const content = await readFile(manifestPath, "utf-8");
    return JSON.parse(content) as PresetManifest;
  } catch {
    return null;
  }
};

/**
 * Collect all generated paths from all preset manifests in a project.
 * Returns a union of all generated_paths, or default paths if no presets found.
 */
export const collectGeneratedPaths = async (
  projectDir: string
): Promise<string[]> => {
  const presetsDir = join(projectDir, ".project", "presets");
  const paths = new Set<string>();

  try {
    const entries = await readdir(presetsDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const manifest = await readManifest(join(presetsDir, entry.name));
        if (manifest?.generated_paths) {
          for (const path of manifest.generated_paths) {
            paths.add(path);
          }
        }
      }
    }
  } catch {
    // Presets directory doesn't exist or isn't readable
  }

  // If no paths found, use defaults
  if (paths.size === 0) {
    return ["src/", "tests/"];
  }

  return Array.from(paths);
};
