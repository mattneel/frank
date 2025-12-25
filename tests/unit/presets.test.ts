/**
 * Unit Tests for the Preset System
 */

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { mkdir, rm, stat } from "fs/promises";
import { join } from "path";
import {
  resolvePreset,
  writePreset,
  isPresetInstalled,
  BASE_PRESET,
} from "../../src/presets";
import { ZIG_PRESET } from "../../src/presets/zig";
import { TYPESCRIPT_PRESET } from "../../src/presets/typescript";
import { ELIXIR_PRESET } from "../../src/presets/elixir";

describe("resolvePreset", () => {
  test("resolves base preset", () => {
    const result = resolvePreset("base");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.preset.name).toBe("base");
    }
  });

  test("resolves zig preset", () => {
    const result = resolvePreset("zig");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.preset.name).toBe("zig");
    }
  });

  test("resolves typescript preset", () => {
    const result = resolvePreset("typescript");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.preset.name).toBe("typescript");
    }
  });

  test("resolves elixir preset", () => {
    const result = resolvePreset("elixir");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.preset.name).toBe("elixir");
    }
  });

  test("is case insensitive", () => {
    const result = resolvePreset("ZIG");
    expect(result.success).toBe(true);
  });

  test("returns error for unknown preset", () => {
    const result = resolvePreset("unknown");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain("Unknown preset");
    }
  });

  test("returns error for GitHub presets (not yet supported)", () => {
    const result = resolvePreset("mattneel/some-preset");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain("GitHub presets not yet supported");
    }
  });

  test("returns error for local presets (not yet supported)", () => {
    const result = resolvePreset("./local-preset");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain("Local presets not yet supported");
    }
  });
});

describe("writePreset", () => {
  const testDir = "/tmp/rtfct-preset-write-test";

  beforeEach(async () => {
    await mkdir(join(testDir, ".project", "presets"), { recursive: true });
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  test("writes preset files to project", async () => {
    await writePreset(testDir, ZIG_PRESET);

    const presetDir = join(testDir, ".project", "presets", "zig");
    const stats = await stat(presetDir);
    expect(stats.isDirectory()).toBe(true);

    // Check manifest exists
    const manifestStats = await stat(join(presetDir, "manifest.json"));
    expect(manifestStats.isFile()).toBe(true);
  });

  test("writes all preset files", async () => {
    await writePreset(testDir, ZIG_PRESET);

    const presetDir = join(testDir, ".project", "presets", "zig");

    // Check files exist
    for (const file of ZIG_PRESET.files) {
      const filePath = join(presetDir, file.path);
      const stats = await stat(filePath);
      expect(stats.isFile()).toBe(true);
    }
  });
});

describe("isPresetInstalled", () => {
  const testDir = "/tmp/rtfct-preset-installed-test";

  beforeEach(async () => {
    await mkdir(join(testDir, ".project", "presets"), { recursive: true });
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  test("returns false when preset not installed", async () => {
    const result = await isPresetInstalled(testDir, "zig");
    expect(result).toBe(false);
  });

  test("returns true when preset is installed", async () => {
    await writePreset(testDir, ZIG_PRESET);
    const result = await isPresetInstalled(testDir, "zig");
    expect(result).toBe(true);
  });
});

describe("preset content", () => {
  test("base preset has all Sacred Text files", () => {
    expect(BASE_PRESET.files.length).toBeGreaterThan(0);
    const paths = BASE_PRESET.files.map((f) => f.path);
    expect(paths).toContain("protocol.md");
    expect(paths).toContain("theology.md");
    expect(paths).toContain("kickstart.md");
    expect(paths).toContain("guardrails.md");
    expect(paths).toContain("kanban/backlog.md");
    expect(paths).toContain("kanban/in-progress.md");
    expect(paths).toContain("kanban/done.md");
  });

  test("base preset has correct manifest", () => {
    expect(BASE_PRESET.manifest.name).toBe("base");
    expect(BASE_PRESET.manifest.version).toBe("0.1.0");
    expect(BASE_PRESET.manifest.generated_paths).toContain("src/");
    expect(BASE_PRESET.manifest.generated_paths).toContain("tests/");
  });

  test("zig preset has required files", () => {
    expect(ZIG_PRESET.files.length).toBeGreaterThan(0);
    const paths = ZIG_PRESET.files.map((f) => f.path);
    expect(paths).toContain("testing/strategy.md");
    expect(paths).toContain("guardrails.md");
  });

  test("typescript preset has required files", () => {
    expect(TYPESCRIPT_PRESET.files.length).toBeGreaterThan(0);
    const paths = TYPESCRIPT_PRESET.files.map((f) => f.path);
    expect(paths).toContain("testing/strategy.md");
    expect(paths).toContain("guardrails.md");
  });

  test("elixir preset has required files", () => {
    expect(ELIXIR_PRESET.files.length).toBeGreaterThan(0);
    const paths = ELIXIR_PRESET.files.map((f) => f.path);
    expect(paths).toContain("testing/strategy.md");
    expect(paths).toContain("guardrails.md");
  });

  test("all presets have generated_paths", () => {
    expect(BASE_PRESET.manifest.generated_paths.length).toBeGreaterThan(0);
    expect(ZIG_PRESET.manifest.generated_paths.length).toBeGreaterThan(0);
    expect(TYPESCRIPT_PRESET.manifest.generated_paths.length).toBeGreaterThan(
      0
    );
    expect(ELIXIR_PRESET.manifest.generated_paths.length).toBeGreaterThan(0);
  });
});
