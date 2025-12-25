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
      console.log("Edit .project/kickstart.md to inscribe your Founding Vision.");
      console.log("\nThe Omnissiah provides. Praise the Machine Spirit.");
      break;
    }

    case "add":
      console.log(`The add command awaits manifestation. Preset: ${parsed.args[0]}`);
      break;

    case "status":
      console.log("The status command awaits manifestation.");
      break;

    case "regenerate":
      console.log("The regenerate command awaits manifestation.");
      break;

    case "praise":
      console.log("The praise command awaits manifestation.");
      break;

    default:
      printHelp();
  }
};

main();
