/**
 * The Resurrect Command — Dissect the Codebase
 *
 * Deletes generated paths in preparation for resurrection.
 */

import { rm, stat } from "fs/promises";
import { join } from "path";
import { collectGeneratedPaths } from "../manifest";

export interface ResurrectOptions {
  yes?: boolean;
}

export interface ResurrectResult {
  success: boolean;
  message: string;
  deletedPaths?: string[];
  requiresConfirmation?: boolean;
  pathsToDelete?: string[];
}

/**
 * Run the resurrect command to dissect the codebase.
 */
export const runResurrect = async (
  targetDir: string,
  options: ResurrectOptions = {}
): Promise<ResurrectResult> => {
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

  // Collect paths to delete
  const pathsToDelete = await collectGeneratedPaths(targetDir);

  // If not confirmed, request confirmation
  if (!options.yes) {
    return {
      success: true,
      requiresConfirmation: true,
      pathsToDelete,
      message: "Confirmation required",
    };
  }

  // Delete the paths
  const deletedPaths: string[] = [];
  for (const path of pathsToDelete) {
    const fullPath = join(targetDir, path);
    try {
      await rm(fullPath, { recursive: true });
      deletedPaths.push(path);
    } catch {
      // Path doesn't exist, which is fine
    }
  }

  return {
    success: true,
    message: "The codebase has been dissected.",
    deletedPaths,
  };
};

/**
 * Format the resurrect result for CLI output.
 */
export const formatResurrect = (result: ResurrectResult): string => {
  if (!result.success) {
    return `✗ ${result.message}`;
  }

  if (result.requiresConfirmation) {
    const lines: string[] = [];
    lines.push("⚠ The Dissection");
    lines.push("");
    lines.push("The following paths will be dissected:");
    for (const path of result.pathsToDelete || []) {
      lines.push(`  - ${path}`);
    }
    lines.push("");
    lines.push("Run with --yes to confirm.");
    return lines.join("\n");
  }

  const lines: string[] = [];
  lines.push("✓ " + result.message);
  lines.push("");

  if (result.deletedPaths && result.deletedPaths.length > 0) {
    lines.push("Dissected paths:");
    for (const path of result.deletedPaths) {
      lines.push(`  - ${path}`);
    }
  } else {
    lines.push("No paths were dissected (already clean).");
  }

  lines.push("");
  lines.push("Invoke the Monster to resurrect.");
  lines.push("");
  lines.push("IT'S ALIVE!");

  return lines.join("\n");
};
