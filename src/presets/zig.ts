/**
 * The Zig Codex — Sacred Patterns for Zig Development
 */

import type { Preset } from "./index";

const TESTING_STRATEGY_MD = `# Zig Testing Strategy

*The Rites of Verification for Zig*

## The Sacred Command

\`\`\`bash
zig build test
\`\`\`

This single incantation runs all tests in the project. The Machine Spirit shall invoke it frequently.

## Test Organization

Tests live alongside the code they test. This is the Zig way.

\`\`\`zig
// src/math.zig
const std = @import("std");
const testing = std.testing;

pub fn add(a: i32, b: i32) i32 {
    return a + b;
}

test "add returns sum of two numbers" {
    try testing.expectEqual(@as(i32, 5), add(2, 3));
}

test "add handles negative numbers" {
    try testing.expectEqual(@as(i32, 0), add(-5, 5));
}

test "add handles overflow" {
    // This should be tested if overflow behavior matters
    const result = @addWithOverflow(std.math.maxInt(i32), 1);
    try testing.expect(result[1] == 1); // overflow occurred
}
\`\`\`

## The build.zig Test Step

\`\`\`zig
const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    // Main executable
    const exe = b.addExecutable(.{
        .name = "myapp",
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
    });
    b.installArtifact(exe);

    // Unit tests
    const unit_tests = b.addTest(.{
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
    });

    const run_unit_tests = b.addRunArtifact(unit_tests);
    const test_step = b.step("test", "Run unit tests");
    test_step.dependOn(&run_unit_tests.step);
}
\`\`\`

## Testing with Allocators

Always use the testing allocator in tests — it detects memory leaks:

\`\`\`zig
test "allocation test" {
    const allocator = std.testing.allocator;

    const slice = try allocator.alloc(u8, 100);
    defer allocator.free(slice);

    // If you forget the defer, the test fails with a leak report
}
\`\`\`

## Comptime Testing

Test comptime functions at comptime:

\`\`\`zig
fn comptimeAdd(comptime a: i32, comptime b: i32) i32 {
    return a + b;
}

test "comptime add" {
    // This is evaluated at compile time
    comptime {
        const result = comptimeAdd(2, 3);
        if (result != 5) @compileError("comptime add failed");
    }

    // This also works
    try std.testing.expectEqual(@as(i32, 5), comptime comptimeAdd(2, 3));
}
\`\`\`

## Coverage Doctrine

- All public functions must have at least one test
- Edge cases (empty, zero, max, min) must be tested explicitly
- Error paths must be tested — verify errors are returned correctly
- Comptime functions need comptime verification

---

*The tests do not lie. Praise the Machine Spirit.*
`;

const GUARDRAILS_MD = `# Zig Guardrails — Forbidden Heresies

*Zig-specific patterns to avoid*

## Memory Heresies

### 1. Forgetting to Free
Every allocation needs a corresponding free. Use \`defer\` immediately:

\`\`\`zig
// HERESY
const ptr = try allocator.create(MyStruct);
// ... code that might return early or error
allocator.destroy(ptr); // might never be reached!

// SACRED
const ptr = try allocator.create(MyStruct);
defer allocator.destroy(ptr);
// Now it's always freed, even on error
\`\`\`

### 2. Use-After-Free
The allocator owns freed memory. Never access it:

\`\`\`zig
// HERESY
allocator.free(slice);
const x = slice[0]; // undefined behavior!

// SACRED
defer allocator.free(slice); // free at end of scope
const x = slice[0]; // valid access
\`\`\`

### 3. Unbounded Allocations
Always use bounded allocators in production:

\`\`\`zig
// HERESY in production
var gpa = std.heap.GeneralPurposeAllocator(.{}){};

// SACRED — use with memory limit
var gpa = std.heap.GeneralPurposeAllocator(.{
    .enable_memory_limit = true,
}){};
gpa.setMemoryLimit(1024 * 1024 * 100); // 100MB limit
\`\`\`

## Allocator Wisdom

Choose the right allocator for the job:

| Allocator | Use Case |
|-----------|----------|
| \`std.testing.allocator\` | Tests only — detects leaks |
| \`std.heap.page_allocator\` | Large, long-lived allocations |
| \`std.heap.GeneralPurposeAllocator\` | General use with safety checks |
| \`std.heap.ArenaAllocator\` | Request-scoped, bulk-free |
| \`std.heap.FixedBufferAllocator\` | Stack-based, no syscalls |

## Comptime Heresies

### 1. Comptime Side Effects
Comptime code must be pure — no I/O, no runtime state:

\`\`\`zig
// HERESY
comptime {
    std.debug.print("hello", .{}); // Error!
}

// SACRED — comptime is for computation only
const result = comptime blk: {
    var sum: i32 = 0;
    for (0..10) |i| sum += @intCast(i);
    break :blk sum;
};
\`\`\`

### 2. Excessive Comptime
Runtime is fine for most things. Don't force comptime:

\`\`\`zig
// HERESY — overcomplicating
fn processData(comptime T: type, comptime N: usize) [N]T { ... }

// SACRED — if N can be runtime, let it be
fn processData(allocator: Allocator, data: []const u8) ![]u8 { ... }
\`\`\`

### 3. Unreadable Generics
If the type signature is a paragraph, simplify:

\`\`\`zig
// HERESY
fn process(
    comptime T: type,
    comptime U: type,
    comptime V: type,
    comptime transform: fn(T) U,
    comptime combine: fn(U, V) T,
) fn([]const T, []const V) []T { ... }

// SACRED — break it down or use concrete types
\`\`\`

## Error Handling

### Never Discard Errors in Production

\`\`\`zig
// HERESY
const value = getData() catch unreachable;

// SACRED
const value = getData() catch |err| {
    log.err("Failed to get data: {}", .{err});
    return err;
};
\`\`\`

### Use Error Sets for Documentation

\`\`\`zig
const FileError = error{
    NotFound,
    PermissionDenied,
    DiskFull,
};

fn readFile(path: []const u8) FileError![]u8 {
    // Callers know exactly what can go wrong
}
\`\`\`

---

*The compiler is wise. Trust its warnings. Praise the Machine Spirit.*
`;

const BUILD_PATTERNS_MD = `# Zig build.zig Patterns

*Sacred patterns for the build system*

## The Minimal build.zig

\`\`\`zig
const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const exe = b.addExecutable(.{
        .name = "myapp",
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
    });

    b.installArtifact(exe);

    // Run step
    const run_cmd = b.addRunArtifact(exe);
    run_cmd.step.dependOn(b.getInstallStep());
    const run_step = b.step("run", "Run the application");
    run_step.dependOn(&run_cmd.step);

    // Test step
    const tests = b.addTest(.{
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
    });
    const run_tests = b.addRunArtifact(tests);
    const test_step = b.step("test", "Run unit tests");
    test_step.dependOn(&run_tests.step);
}
\`\`\`

## Library with Tests

\`\`\`zig
const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    // Static library
    const lib = b.addStaticLibrary(.{
        .name = "mylib",
        .root_source_file = b.path("src/lib.zig"),
        .target = target,
        .optimize = optimize,
    });
    b.installArtifact(lib);

    // Module for dependents
    _ = b.addModule("mylib", .{
        .root_source_file = b.path("src/lib.zig"),
    });

    // Tests
    const lib_tests = b.addTest(.{
        .root_source_file = b.path("src/lib.zig"),
        .target = target,
        .optimize = optimize,
    });
    const run_lib_tests = b.addRunArtifact(lib_tests);
    const test_step = b.step("test", "Run library tests");
    test_step.dependOn(&run_lib_tests.step);
}
\`\`\`

## Adding Dependencies

\`\`\`zig
const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    // Fetch dependency
    const zap = b.dependency("zap", .{
        .target = target,
        .optimize = optimize,
    });

    const exe = b.addExecutable(.{
        .name = "myserver",
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
    });

    // Add dependency module
    exe.root_module.addImport("zap", zap.module("zap"));

    b.installArtifact(exe);
}
\`\`\`

With \`build.zig.zon\`:

\`\`\`zig
.{
    .name = "myserver",
    .version = "0.1.0",
    .dependencies = .{
        .zap = .{
            .url = "https://github.com/zigzap/zap/archive/v0.6.0.tar.gz",
            .hash = "...",
        },
    },
}
\`\`\`

## Cross-Compilation

\`\`\`zig
pub fn build(b: *std.Build) void {
    // Default: host platform
    const target = b.standardTargetOptions(.{});

    // Or specify explicit targets
    const linux_x86 = b.resolveTargetQuery(.{
        .cpu_arch = .x86_64,
        .os_tag = .linux,
    });

    const windows_x86 = b.resolveTargetQuery(.{
        .cpu_arch = .x86_64,
        .os_tag = .windows,
    });

    // Build for each target
    inline for (.{ target, linux_x86, windows_x86 }) |t| {
        const exe = b.addExecutable(.{
            .name = "myapp",
            .root_source_file = b.path("src/main.zig"),
            .target = t,
            .optimize = b.standardOptimizeOption(.{}),
        });
        b.installArtifact(exe);
    }
}
\`\`\`

## C Interop

\`\`\`zig
pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const exe = b.addExecutable(.{
        .name = "myapp",
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
    });

    // Link C library
    exe.linkSystemLibrary("sqlite3");
    exe.linkLibC();

    // Add C source files
    exe.addCSourceFiles(.{
        .files = &.{ "src/legacy.c", "src/wrapper.c" },
        .flags = &.{ "-std=c99", "-Wall" },
    });

    // Include paths
    exe.addIncludePath(b.path("include"));

    b.installArtifact(exe);
}
\`\`\`

## Release Optimizations

\`\`\`zig
pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const exe = b.addExecutable(.{
        .name = "myapp",
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
    });

    // Strip debug info in release
    if (optimize != .Debug) {
        exe.root_module.strip = true;
    }

    // Enable LTO for release
    if (optimize == .ReleaseFast or optimize == .ReleaseSmall) {
        exe.want_lto = true;
    }

    b.installArtifact(exe);
}
\`\`\`

---

*The build system is sacred. Praise the Machine Spirit.*
`;

export const ZIG_PRESET: Preset = {
  name: "zig",
  manifest: {
    name: "zig",
    version: "0.1.0",
    description: "The Zig Codex — Systems programming with safety",
    depends: ["base"],
    generated_paths: ["src/", "build.zig", "build.zig.zon"],
  },
  files: [
    { path: "testing/strategy.md", content: TESTING_STRATEGY_MD },
    { path: "guardrails.md", content: GUARDRAILS_MD },
    { path: "design/patterns.md", content: BUILD_PATTERNS_MD },
  ],
};
