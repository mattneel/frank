#!/usr/bin/env bun
/**
 * frank — Blueprint-Driven Development
 *
 * A CLI tool for blueprint-driven development.
 * The .project/ folder is the source of truth.
 */

import { parseArgs } from "./args";
import { printHelp, printVersion, printError } from "./help";
import { runInit, formatInit } from "./commands/init";
import { runAdd, formatAdd } from "./commands/add";
import { runStatus, formatStatus } from "./commands/status";
import { runResurrect, formatResurrect } from "./commands/resurrect";
import { runAlive } from "./commands/alive";

const main = async (): Promise<void> => {
  const parsed = parseArgs(process.argv.slice(2));

  // Handle parse errors
  if (parsed.error) {
    printError(parsed.error);
    process.exit(1);
  }

  // Handle global flags
  if (parsed.flags.help) {
    printHelp();
    return;
  }

  if (parsed.flags.version) {
    printVersion();
    return;
  }

  // No command specified
  if (!parsed.command) {
    printHelp();
    return;
  }

  const cwd = process.cwd();

  // Execute the command
  switch (parsed.command) {
    case "init": {
      const result = await runInit(cwd, {
        force: parsed.flags.force,
        presets: parsed.flags.with,
      });
      console.log(formatInit(result));
      if (!result.success) {
        process.exit(1);
      }
      break;
    }

    case "add": {
      if (parsed.args.length === 0) {
        printError("The 'add' command requires an Organ name.");
        process.exit(1);
      }
      const result = await runAdd(cwd, parsed.args[0]);
      console.log(formatAdd(result));
      if (!result.success) {
        process.exit(1);
      }
      break;
    }

    case "status": {
      const result = await runStatus(cwd);
      console.log(formatStatus(result));
      if (!result.success) {
        process.exit(1);
      }
      break;
    }

    case "resurrect": {
      const result = await runResurrect(cwd, {
        yes: parsed.flags.yes,
      });
      console.log(formatResurrect(result));
      if (!result.success) {
        process.exit(1);
      }
      break;
    }

    case "alive": {
      console.log(runAlive());
      break;
    }
  }
};

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
