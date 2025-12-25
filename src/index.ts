#!/usr/bin/env bun

/**
 * rtfct — The CLI of the Adeptus Artefactus
 *
 * Markdown-driven development. The spec is the source of truth.
 * Code is a regenerable artefact.
 *
 * The Omnissiah provides. Praise the Machine Spirit.
 */

import { parseArgs } from "./args";
import { printHelp, printVersion, printError } from "./help";
import { runInit } from "./commands/init";
import { runAdd } from "./commands/add";
import { runStatus, formatStatus } from "./commands/status";
import { runPraise } from "./commands/praise";
import { runRegenerate, formatRegenerate } from "./commands/regenerate";

const main = async (): Promise<void> => {
  const args = process.argv.slice(2);
  const parsed = parseArgs(args);

  // Handle errors
  if (parsed.error) {
    printError(parsed.error);
    process.exit(1);
  }

  // Handle global flags
  if (parsed.flags.version) {
    printVersion();
    return;
  }

  if (parsed.flags.help) {
    printHelp(parsed.command);
    return;
  }

  // Handle commands
  switch (parsed.command) {
    case "init": {
      const result = await runInit(process.cwd(), parsed.flags);
      if (!result.success) {
        printError(result.error!);
        process.exit(1);
      }
      console.log("The Sacred Texts have been consecrated.");
      if (result.presets && result.presets.length > 0) {
        console.log(`Codices incorporated: ${result.presets.join(", ")}`);
      }
      console.log("Edit .project/kickstart.md to inscribe your Founding Vision.");
      console.log("\nThe Omnissiah provides. Praise the Machine Spirit.");
      break;
    }

    case "add": {
      const presetName = parsed.args[0];
      if (!presetName) {
        printError("The 'add' command requires a preset name. Example: rtfct add zig");
        process.exit(1);
      }

      const result = await runAdd(process.cwd(), presetName);
      if (!result.success) {
        printError(result.error!);
        process.exit(1);
      }
      console.log(`The Codex "${result.presetName}" has been incorporated.`);
      console.log("The Sacred Texts are enriched with new wisdom.");
      console.log("\nThe Omnissiah provides.");
      break;
    }

    case "status": {
      const result = await runStatus(process.cwd());
      if (!result.success) {
        printError(result.error!);
        process.exit(1);
      }
      console.log(formatStatus(result.data!));
      break;
    }

    case "regenerate": {
      // Check for confirmation flag
      if (!parsed.flags.yes) {
        console.log("Are you certain? This will purify all generated code.");
        console.log("Run with --yes or -y to confirm.");
        process.exit(1);
      }

      const result = await runRegenerate(process.cwd(), parsed.flags);
      if (!result.success) {
        printError(result.error!);
        process.exit(1);
      }
      console.log(formatRegenerate(result.purifiedPaths || []));
      break;
    }

    case "praise":
      runPraise();
      break;

    default:
      printHelp();
  }
};

main();
