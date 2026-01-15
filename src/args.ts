/**
 * The Argument Parser — Interprets the Creator's Commands
 *
 * Parses CLI arguments into structured commands and flags.
 */

export type Command = "init" | "add" | "status" | "resurrect" | "alive";

export interface ParsedFlags {
  help: boolean;
  version: boolean;
  force: boolean;
  yes: boolean;
  with: string[];
}

export interface ParsedArgs {
  command?: Command;
  args: string[];
  flags: ParsedFlags;
  error?: string;
}

const VALID_COMMANDS: Command[] = [
  "init",
  "add",
  "status",
  "resurrect",
  "alive",
];

/**
 * Parse command line arguments into structured form.
 * @param argv - Raw arguments (typically process.argv.slice(2))
 */
export const parseArgs = (argv: string[]): ParsedArgs => {
  const flags: ParsedFlags = {
    help: false,
    version: false,
    force: false,
    yes: false,
    with: [],
  };

  const args: string[] = [];
  let command: Command | undefined;
  let error: string | undefined;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    // Handle flags
    if (arg.startsWith("--")) {
      const flag = arg.slice(2);

      if (flag === "help") {
        flags.help = true;
      } else if (flag === "version") {
        flags.version = true;
      } else if (flag === "force") {
        flags.force = true;
      } else if (flag === "yes") {
        flags.yes = true;
      } else if (flag === "with") {
        // Next argument is the preset list
        const nextArg = argv[++i];
        if (nextArg) {
          flags.with = nextArg.split(",").map((s) => s.trim());
        }
      } else {
        error = `Unknown flag: --${flag}`;
        break;
      }
    } else if (arg.startsWith("-")) {
      const flag = arg.slice(1);

      if (flag === "h") {
        flags.help = true;
      } else if (flag === "v") {
        flags.version = true;
      } else if (flag === "f") {
        flags.force = true;
      } else if (flag === "y") {
        flags.yes = true;
      } else {
        error = `Unknown flag: -${flag}`;
        break;
      }
    } else if (!command) {
      // First non-flag argument is the command
      if (VALID_COMMANDS.includes(arg as Command)) {
        command = arg as Command;
      } else {
        error = `Unknown command: ${arg}`;
        break;
      }
    } else {
      // Additional arguments after command
      args.push(arg);
    }
  }

  return { command, args, flags, error };
};
