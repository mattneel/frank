/**
 * The Help System — Guidance for the Creator
 *
 * Displays usage information, version, and error messages.
 */

const VERSION = "0.1.0";

const USAGE = `
frank — Blueprint-Driven Development

USAGE:
  frank <command> [options]

COMMANDS:
  init           Assemble a new laboratory with the Blueprint
  add <organ>    Graft an Organ into an existing project
  status         Check vital signs of the work queue
  resurrect      Dissect the codebase for resurrection
  alive          Recite the Incantation

OPTIONS:
  --help, -h     Display this guidance
  --version, -v  Display the version of frank
  --force, -f    Dissect existing .project/ and recreate (init only)
  --yes, -y      Skip confirmation prompts
  --with <list>  Comma-separated Organs to graft (init only)

EXAMPLES:
  frank init                    # Basic laboratory assembly
  frank init --with zig         # Assemble with Zig Organ
  frank init --with zig,elixir  # Multiple Organs
  frank add typescript          # Graft TypeScript Organ
  frank status                  # View work queue
  frank resurrect --yes         # Dissect without confirmation

IT'S ALIVE!
`.trim();

export const printHelp = (): void => {
  console.log(USAGE);
};

export const printVersion = (): void => {
  console.log(`frank v${VERSION}`);
};

export const printError = (message: string): void => {
  console.error(`Error: ${message}`);
  console.error("");
  console.error("Run 'frank --help' for usage.");
};
