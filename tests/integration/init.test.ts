import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm, readdir, readFile, access } from "fs/promises";
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

describe("The init Command", () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), "rtfct-test-"));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  describe("consecration of the Sacred Texts", () => {
    test("creates .project/ directory", async () => {
      await runCli(["init"], tempDir);
      expect(await exists(join(tempDir, ".project"))).toBe(true);
    });

    test("creates protocol.md", async () => {
      await runCli(["init"], tempDir);
      expect(await exists(join(tempDir, ".project/protocol.md"))).toBe(true);
    });

    test("creates theology.md", async () => {
      await runCli(["init"], tempDir);
      expect(await exists(join(tempDir, ".project/theology.md"))).toBe(true);
    });

    test("creates kickstart.md template", async () => {
      await runCli(["init"], tempDir);
      expect(await exists(join(tempDir, ".project/kickstart.md"))).toBe(true);
    });

    test("creates guardrails.md", async () => {
      await runCli(["init"], tempDir);
      expect(await exists(join(tempDir, ".project/guardrails.md"))).toBe(true);
    });

    test("creates kanban structure", async () => {
      await runCli(["init"], tempDir);
      expect(await exists(join(tempDir, ".project/kanban/backlog.md"))).toBe(true);
      expect(await exists(join(tempDir, ".project/kanban/in-progress.md"))).toBe(true);
      expect(await exists(join(tempDir, ".project/kanban/done.md"))).toBe(true);
    });

    test("creates specs/ directory", async () => {
      await runCli(["init"], tempDir);
      expect(await exists(join(tempDir, ".project/specs"))).toBe(true);
    });

    test("creates design/ directory", async () => {
      await runCli(["init"], tempDir);
      expect(await exists(join(tempDir, ".project/design"))).toBe(true);
    });

    test("creates testing/ directory", async () => {
      await runCli(["init"], tempDir);
      expect(await exists(join(tempDir, ".project/testing"))).toBe(true);
    });

    test("creates adrs/ directory", async () => {
      await runCli(["init"], tempDir);
      expect(await exists(join(tempDir, ".project/adrs"))).toBe(true);
    });
  });

  describe("protection against desecration", () => {
    test("fails if .project/ already exists", async () => {
      await runCli(["init"], tempDir);
      const result = await runCli(["init"], tempDir);
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain("already exist");
    });

    test("--force purifies existing .project/ and recreates", async () => {
      await runCli(["init"], tempDir);

      // Modify a file to verify it gets purified
      const kickstartPath = join(tempDir, ".project/kickstart.md");
      await Bun.write(kickstartPath, "# Modified by heretic");

      const result = await runCli(["init", "--force"], tempDir);
      expect(result.exitCode).toBe(0);

      // Verify the file was reset
      const content = await readFile(kickstartPath, "utf-8");
      expect(content).not.toContain("heretic");
    });
  });

  describe("output messages", () => {
    test("displays success message on completion", async () => {
      const result = await runCli(["init"], tempDir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("consecrated");
    });
  });
});
