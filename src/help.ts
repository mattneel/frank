/**
 * The Help System — Guidance for the Tech-Priest
 *
 * Displays usage information, version, and error messages.
 */

const VERSION = "0.1.0";

const USAGE = `
rtfct — The Ritual Factory

USAGE:
  rtfct <command> [options]

COMMANDS:
  init          Consecrate a new project with Sacred Texts
  add <preset>  Incorporate a Codex into an existing project
  status        Reveal the state of the Litany of Tasks
  regenerate    Purify the codebase for regeneration
  praise        Recite the Litany of Deterministic Codegen

OPTIONS:
  --help, -h     Display this sacred guidance
  --version, -v  Display the version of rtfct
  --force, -f    Purify existing .project/ and recreate (init only)
  --yes, -y      Skip confirmation prompts
  --with <list>  Comma-separated Codices to include (init only)

EXAMPLES:
  rtfct init                    # Basic consecration
  rtfct init --with zig         # Consecrate with Zig Codex
  rtfct init --with zig,elixir  # Multiple Codices
  rtfct add typescript          # Add TypeScript Codex
  rtfct status                  # View task progress
  rtfct regenerate --yes        # Purify without confirmation

The Omnissiah provides.
`.trim();

export const printHelp = (): void => {
  console.log(USAGE);
};

export const printVersion = (): void => {
  console.log(`rtfct v${VERSION}`);
};

export const printError = (message: string): void => {
  console.error(`Error: ${message}`);
  console.error("");
  console.error("Run 'rtfct --help' for usage.");
};
