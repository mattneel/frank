/**
 * Unit Tests for the Manifest Reader
 */

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { mkdir, writeFile, rm } from "fs/promises";
import { join } from "path";
import { collectGeneratedPaths, readManifest } from "../../src/manifest";

describe("readManifest", () => {
  const testDir = "/tmp/rtfct-manifest-test";

  beforeEach(async () => {
    await mkdir(testDir, { recursive: true });
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  test("reads valid manifest", async () => {
    const manifest = {
      name: "test",
      version: "1.0.0",
      description: "Test preset",
      generated_paths: ["src/", "lib/"],
    };
    await writeFile(join(testDir, "manifest.json"), JSON.stringify(manifest));

    const result = await readManifest(testDir);
    expect(result).not.toBeNull();
    expect(result!.name).toBe("test");
    expect(result!.generated_paths).toEqual(["src/", "lib/"]);
  });

  test("returns null for missing manifest", async () => {
    const result = await readManifest(testDir);
    expect(result).toBeNull();
  });

  test("returns null for invalid JSON", async () => {
    await writeFile(join(testDir, "manifest.json"), "not valid json");

    const result = await readManifest(testDir);
    expect(result).toBeNull();
  });
});

describe("collectGeneratedPaths", () => {
  const testDir = "/tmp/rtfct-collect-test";
  const presetsDir = join(testDir, ".project", "presets");

  beforeEach(async () => {
    await mkdir(presetsDir, { recursive: true });
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  test("returns default paths when no presets exist", async () => {
    // Empty presets directory
    const paths = await collectGeneratedPaths(testDir);
    expect(paths).toEqual(["src/", "tests/"]);
  });

  test("collects paths from single preset", async () => {
    const presetDir = join(presetsDir, "zig");
    await mkdir(presetDir);
    await writeFile(
      join(presetDir, "manifest.json"),
      JSON.stringify({
        name: "zig",
        version: "1.0.0",
        description: "Zig preset",
        generated_paths: ["src/", "build.zig"],
      })
    );

    const paths = await collectGeneratedPaths(testDir);
    expect(paths).toContain("src/");
    expect(paths).toContain("build.zig");
  });

  test("collects paths from multiple presets", async () => {
    // Create zig preset
    const zigDir = join(presetsDir, "zig");
    await mkdir(zigDir);
    await writeFile(
      join(zigDir, "manifest.json"),
      JSON.stringify({
        name: "zig",
        version: "1.0.0",
        description: "Zig",
        generated_paths: ["src/", "build.zig"],
      })
    );

    // Create typescript preset
    const tsDir = join(presetsDir, "typescript");
    await mkdir(tsDir);
    await writeFile(
      join(tsDir, "manifest.json"),
      JSON.stringify({
        name: "typescript",
        version: "1.0.0",
        description: "TypeScript",
        generated_paths: ["src/", "tests/"],
      })
    );

    const paths = await collectGeneratedPaths(testDir);
    expect(paths).toContain("src/");
    expect(paths).toContain("build.zig");
    expect(paths).toContain("tests/");
  });

  test("deduplicates paths from multiple presets", async () => {
    // Both presets have src/
    const zigDir = join(presetsDir, "zig");
    await mkdir(zigDir);
    await writeFile(
      join(zigDir, "manifest.json"),
      JSON.stringify({
        name: "zig",
        version: "1.0.0",
        description: "Zig",
        generated_paths: ["src/"],
      })
    );

    const tsDir = join(presetsDir, "typescript");
    await mkdir(tsDir);
    await writeFile(
      join(tsDir, "manifest.json"),
      JSON.stringify({
        name: "typescript",
        version: "1.0.0",
        description: "TypeScript",
        generated_paths: ["src/"],
      })
    );

    const paths = await collectGeneratedPaths(testDir);
    // Should only have src/ once
    const srcCount = paths.filter((p) => p === "src/").length;
    expect(srcCount).toBe(1);
  });

  test("returns default when presets directory does not exist", async () => {
    await rm(presetsDir, { recursive: true, force: true });
    const paths = await collectGeneratedPaths(testDir);
    expect(paths).toEqual(["src/", "tests/"]);
  });
});
