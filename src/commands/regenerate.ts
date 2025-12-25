/**
 * The Regenerate Command — Purify the Codebase
 *
 * Deletes generated paths in preparation for regeneration.
 */

import { rm, stat } from "fs/promises";
import { join } from "path";
import { collectGeneratedPaths } from "../manifest";

export interface RegenerateOptions {
  yes?: boolean;
}

export interface RegenerateResult {
  success: boolean;
  message: string;
  deletedPaths?: string[];
  requiresConfirmation?: boolean;
  pathsToDelete?: string[];
}

/**
 * Run the regenerate command to purify the codebase.
 */
export const runRegenerate = async (
  targetDir: string,
  options: RegenerateOptions = {}
): Promise<RegenerateResult> => {
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
    message: "The codebase has been purified.",
    deletedPaths,
  };
};

/**
 * Format the regenerate result for CLI output.
 */
export const formatRegenerate = (result: RegenerateResult): string => {
  if (!result.success) {
    return `✗ ${result.message}`;
  }

  if (result.requiresConfirmation) {
    const lines: string[] = [];
    lines.push("⚠ The Rite of Purification");
    lines.push("");
    lines.push("The following paths will be purified:");
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
    lines.push("Purified paths:");
    for (const path of result.deletedPaths) {
      lines.push(`  - ${path}`);
    }
  } else {
    lines.push("No paths were purified (already clean).");
  }

  lines.push("");
  lines.push("Invoke the Machine Spirit to regenerate.");
  lines.push("");
  lines.push("The Omnissiah provides.");

  return lines.join("\n");
};
