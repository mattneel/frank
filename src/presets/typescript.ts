/**
 * The TypeScript Codex — Sacred Patterns for TypeScript Development
 */

import type { Preset } from "./index";

const TESTING_STRATEGY_MD = `# TypeScript Testing Strategy

*The Rites of Verification for TypeScript*

## The Sacred Command

\`\`\`bash
npx vitest        # Watch mode — the Machine Spirit watches
npx vitest run    # Single run — for CI/CD
npx vitest --ui   # Visual interface — for deep investigation
\`\`\`

## Why Vitest

Vitest is the sacred choice for TypeScript testing:
- Native ESM support
- TypeScript out of the box
- Jest-compatible API
- Blazingly fast with Vite

## Test Organization

\`\`\`
tests/
├── unit/              # Pure function tests
│   ├── utils.test.ts
│   └── validators.test.ts
├── integration/       # Module interaction tests
│   ├── api.test.ts
│   └── database.test.ts
├── e2e/               # End-to-end tests (if applicable)
└── fixtures/          # Shared test data
    └── users.json
\`\`\`

## The Sacred Pattern

\`\`\`typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserService } from '../src/services/user';
import { Database } from '../src/database';

// Mock external dependencies
vi.mock('../src/database');

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new UserService();
  });

  describe('getUser', () => {
    it('returns user when found', async () => {
      const mockUser = { id: '1', name: 'Tech-Priest' };
      vi.mocked(Database.findUser).mockResolvedValue(mockUser);

      const result = await service.getUser('1');

      expect(result).toEqual(mockUser);
      expect(Database.findUser).toHaveBeenCalledWith('1');
    });

    it('throws when user not found', async () => {
      vi.mocked(Database.findUser).mockResolvedValue(null);

      await expect(service.getUser('999')).rejects.toThrow('User not found');
    });
  });
});
\`\`\`

## Testing Async Code

\`\`\`typescript
import { describe, it, expect, vi } from 'vitest';

describe('async operations', () => {
  it('handles promises correctly', async () => {
    const result = await fetchData();
    expect(result).toBeDefined();
  });

  it('handles promise rejection', async () => {
    await expect(failingOperation()).rejects.toThrow('Expected error');
  });

  it('uses fake timers for delays', async () => {
    vi.useFakeTimers();

    const promise = delayedOperation(1000);
    vi.advanceTimersByTime(1000);

    await expect(promise).resolves.toBe('done');

    vi.useRealTimers();
  });
});
\`\`\`

## Type Testing

\`\`\`typescript
import { describe, it, expectTypeOf } from 'vitest';
import { processData } from '../src/utils';

describe('type safety', () => {
  it('returns correct type', () => {
    const result = processData({ value: 42 });
    expectTypeOf(result).toEqualTypeOf<{ processed: number }>();
  });

  it('accepts correct input type', () => {
    expectTypeOf(processData).parameter(0).toMatchTypeOf<{ value: number }>();
  });
});
\`\`\`

## Vitest Configuration

\`\`\`typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/'],
    },
  },
});
\`\`\`

## Coverage Doctrine

- All exported functions must have tests
- Edge cases (null, undefined, empty, boundary values) tested explicitly
- Error paths tested — verify errors are thrown correctly
- Mocks used only for external dependencies, not for internal modules

---

*The tests do not lie. Praise the Machine Spirit.*
`;

const GUARDRAILS_MD = `# TypeScript Guardrails — Forbidden Heresies

*TypeScript-specific patterns to avoid*

## Type Heresies

### 1. The \`any\` Heresy
Every \`any\` is a failure of imagination. Use \`unknown\` and narrow:

\`\`\`typescript
// HERESY
function process(data: any) {
  return data.value; // No safety!
}

// SACRED
function process(data: unknown) {
  if (isValidData(data)) {
    return data.value; // Type-safe!
  }
  throw new Error('Invalid data');
}

function isValidData(data: unknown): data is { value: string } {
  return typeof data === 'object' && data !== null && 'value' in data;
}
\`\`\`

### 2. Type Assertion Abuse
\`as Type\` bypasses the compiler. Prefer type guards:

\`\`\`typescript
// HERESY
const user = response.data as User; // Hope it's right!

// SACRED
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data
  );
}

if (isUser(response.data)) {
  const user = response.data; // Compiler verified!
}
\`\`\`

### 3. Non-null Assertion
\`foo!\` is a lie waiting to happen:

\`\`\`typescript
// HERESY
const name = user.profile!.name!; // Runtime error waiting

// SACRED
const name = user.profile?.name ?? 'Unknown';

// Or with explicit check
if (user.profile?.name) {
  const name = user.profile.name; // Safe!
}
\`\`\`

### 4. Implicit Any in Callbacks
Always type your parameters:

\`\`\`typescript
// HERESY
items.map(item => item.value); // item is implicitly any

// SACRED
items.map((item: Item) => item.value);
// Or better, ensure items is properly typed: Item[]
\`\`\`

## Async Heresies

### 1. Floating Promises
Every promise must be handled:

\`\`\`typescript
// HERESY
saveData(data); // Promise ignored!

// SACRED
await saveData(data);
// Or if you truly don't care about the result:
void saveData(data); // Explicit intention
\`\`\`

### 2. Missing Error Handling

\`\`\`typescript
// HERESY
const data = await fetchData(); // What if it fails?

// SACRED
try {
  const data = await fetchData();
} catch (error) {
  if (error instanceof NetworkError) {
    // Handle network issues
  }
  throw error; // Re-throw if unhandled
}
\`\`\`

### 3. Async in Constructors

\`\`\`typescript
// HERESY
class Service {
  constructor() {
    this.init(); // Async operation in constructor!
  }
  private async init() { ... }
}

// SACRED — Use factory pattern
class Service {
  private constructor() {}

  static async create(): Promise<Service> {
    const service = new Service();
    await service.init();
    return service;
  }
}
\`\`\`

## Import Heresies

### 1. Circular Dependencies
If A imports B and B imports A, restructure:

\`\`\`typescript
// HERESY
// user.ts imports role.ts, role.ts imports user.ts

// SACRED — Extract shared types
// types.ts — shared types
// user.ts — imports types.ts
// role.ts — imports types.ts
\`\`\`

### 2. Default Export Abuse

\`\`\`typescript
// HERESY
export default class UserService { }
import UserService from './user-service'; // Can be renamed silently

// SACRED
export class UserService { }
import { UserService } from './user-service'; // Refactor-safe
\`\`\`

### 3. Barrel File Overuse

\`\`\`typescript
// HERESY — Re-exports everything, slows bundling
// index.ts
export * from './user';
export * from './role';
export * from './permission';

// SACRED — Import directly
import { UserService } from './services/user';
\`\`\`

## Null Safety

### Always Use Nullish Coalescing

\`\`\`typescript
// HERESY — falsy values cause bugs
const value = config.timeout || 3000; // 0 becomes 3000!

// SACRED
const value = config.timeout ?? 3000; // Only null/undefined trigger default
\`\`\`

---

*The compiler is wise. Enable strict mode. Praise the Machine Spirit.*
`;

const TSCONFIG_PATTERNS_MD = `# TypeScript tsconfig Patterns

*Sacred configurations for the TypeScript compiler*

## The Strict Foundation

Every project must start with strict mode:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

This enables all strict type-checking options:
- \`strictNullChecks\` — null and undefined are distinct types
- \`strictFunctionTypes\` — stricter function type checking
- \`strictBindCallApply\` — strict bind, call, apply methods
- \`strictPropertyInitialization\` — class properties must be initialized
- \`noImplicitAny\` — error on expressions with implied any
- \`noImplicitThis\` — error on this with implied any type

## The Recommended Base

\`\`\`json
{
  "compilerOptions": {
    // Strict Type Checking
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,

    // Module Resolution
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "isolatedModules": true,

    // Output
    "target": "ES2022",
    "lib": ["ES2022"],
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,

    // Quality
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
\`\`\`

## Node.js Application

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,

    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "target": "ES2022",
    "lib": ["ES2022"],

    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "sourceMap": true,

    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
\`\`\`

## Library Configuration

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "declaration": true,
    "declarationMap": true,

    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2020",
    "lib": ["ES2020"],

    "outDir": "./dist",
    "rootDir": "./src",

    // Don't emit — let bundler handle it
    "noEmit": true
  },
  "include": ["src/**/*"]
}
\`\`\`

## React Application

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,

    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",

    "jsx": "react-jsx",
    "jsxImportSource": "react",

    "noEmit": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
\`\`\`

## Monorepo Base Config

\`\`\`json
// packages/tsconfig.base.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,

    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022",

    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,

    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}

// packages/core/tsconfig.json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "references": []
}

// packages/api/tsconfig.json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "references": [
    { "path": "../core" }
  ]
}
\`\`\`

## The Forbidden Options

Never enable these in production:

\`\`\`json
{
  "compilerOptions": {
    // HERESY — Disables type safety
    "strict": false,
    "noImplicitAny": false,
    "strictNullChecks": false,

    // HERESY — Ignores errors
    "suppressImplicitAnyIndexErrors": true,
    "suppressExcessPropertyErrors": true
  }
}
\`\`\`

## Path Aliases

\`\`\`json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
\`\`\`

Remember to configure your bundler (Vite, webpack, etc.) to resolve these paths.

---

*The compiler configuration is sacred. Praise the Machine Spirit.*
`;

export const TYPESCRIPT_PRESET: Preset = {
  name: "typescript",
  manifest: {
    name: "typescript",
    version: "0.1.0",
    description: "The TypeScript Codex — Type-safe JavaScript",
    depends: ["base"],
    generated_paths: ["src/", "tests/", "dist/"],
  },
  files: [
    { path: "testing/strategy.md", content: TESTING_STRATEGY_MD },
    { path: "guardrails.md", content: GUARDRAILS_MD },
    { path: "design/patterns.md", content: TSCONFIG_PATTERNS_MD },
  ],
};
