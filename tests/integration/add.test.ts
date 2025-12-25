import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm, mkdir, writeFile, access } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

const runCli = async (
  args: string[],
  cwd: string
): Promise<{ stdout: string; stderr: string; exitCode: number }> => {
  const proc = Bun.spawn(["bun", "run", join(import.meta.dir, "../../src/index.ts"), ...args], {
    cwd,
    stdout: "pipe",
    stderr: "pipe",
  });
  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();
  const exitCode = await proc.exited;
  return { stdout, stderr, exitCode };
};

const exists = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

describe("The add Command", () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), "rtfct-add-test-"));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  const setupConsecratedProject = async () => {
    // Create a basic consecrated project structure
    await mkdir(join(tempDir, ".project/kanban"), { recursive: true });
    await mkdir(join(tempDir, ".project/presets"), { recursive: true });
    await writeFile(join(tempDir, ".project/protocol.md"), "# Protocol\n");
    await writeFile(join(tempDir, ".project/kanban/backlog.md"), "# Backlog\n");
    await writeFile(join(tempDir, ".project/kanban/in-progress.md"), "# In Progress\n");
    await writeFile(join(tempDir, ".project/kanban/done.md"), "# Done\n");
  };

  describe("incorporation of Codices", () => {
    test("adds zig preset to existing project", async () => {
      await setupConsecratedProject();

      const result = await runCli(["add", "zig"], tempDir);
      expect(result.exitCode).toBe(0);
      expect(await exists(join(tempDir, ".project/presets/zig"))).toBe(true);
      expect(await exists(join(tempDir, ".project/presets/zig/manifest.json"))).toBe(true);
    });

    test("adds typescript preset to existing project", async () => {
      await setupConsecratedProject();

      const result = await runCli(["add", "typescript"], tempDir);
      expect(result.exitCode).toBe(0);
      expect(await exists(join(tempDir, ".project/presets/typescript"))).toBe(true);
    });

    test("adds elixir preset to existing project", async () => {
      await setupConsecratedProject();

      const result = await runCli(["add", "elixir"], tempDir);
      expect(result.exitCode).toBe(0);
      expect(await exists(join(tempDir, ".project/presets/elixir"))).toBe(true);
      expect(await exists(join(tempDir, ".project/presets/elixir/manifest.json"))).toBe(true);
    });

    test("displays success message with preset name", async () => {
      await setupConsecratedProject();

      const result = await runCli(["add", "zig"], tempDir);
      expect(result.stdout).toContain("zig");
      expect(result.stdout).toMatch(/incorporat|add/i);
    });
  });

  describe("protection against duplicate incorporation", () => {
    test("fails if preset already incorporated", async () => {
      await setupConsecratedProject();

      // Add preset first time
      await runCli(["add", "zig"], tempDir);

      // Try to add again
      const result = await runCli(["add", "zig"], tempDir);
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toMatch(/already|exist/i);
    });
  });

  describe("error handling", () => {
    test("fails if .project/ does not exist", async () => {
      const result = await runCli(["add", "zig"], tempDir);
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain(".project");
    });

    test("fails for unknown preset", async () => {
      await setupConsecratedProject();

      const result = await runCli(["add", "heretical-codex"], tempDir);
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain("heretical-codex");
    });

    test("fails if preset name not provided", async () => {
      await setupConsecratedProject();

      const result = await runCli(["add"], tempDir);
      expect(result.exitCode).toBe(1);
    });
  });
});
