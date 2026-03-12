# AGENTS.md — react-native-cool-table

High-performance React Native table component library. TypeScript, strict mode.

---

## Commands

```bash
# Development
yarn bootstrap          # Install all deps + iOS pods (first-time setup)
yarn example            # Run commands in the example/ sub-project

# Quality checks (run before committing — enforced by husky pre-commit)
yarn lint               # ESLint on **/*.{js,ts,tsx}
yarn typescript         # tsc --noEmit (type check only, no emit)

# Testing
yarn test               # Run all Jest tests
yarn test --testPathPattern="src/__tests__/index"  # Run a single test file
yarn test --watch       # Watch mode

# Build
yarn prepare            # Build lib/ via react-native-builder-bob (commonjs + module + types)

# Release
yarn release            # release-it (changelog + npm publish + GitHub release)
```

> CI runs: `lint` → `typescript` → `test --coverage` → `prepare` (all must pass).

---

## Project Structure

```
src/
  components/
    Cell/           # index.tsx + styles.ts
    Row/            # index.tsx + styles.ts
    Table/          # index.tsx + styles.ts
    Sort/           # index.tsx (+ styles if needed)
    Empty/          # index.tsx (+ styles if needed)
  hooks/
    index.ts        # re-exports
    useUpdateEffect.ts
    createUpdateEffect.ts
  types/
    index.ts        # All shared TypeScript types/interfaces
  constant/
    index.ts        # SORT_STATUS_MAP, ALIGN_MAP, asset requires
  assets/           # PNG assets
  __tests__/
    index.test.tsx  # Jest tests (react-native preset)
  index.tsx         # Public API — barrel export
example/            # Standalone RN app to demo the library
lib/                # Build output — DO NOT edit
```

---

## TypeScript

- **Strict mode** (`"strict": true`) — no exceptions.
- `noUnusedLocals` and `noUnusedParameters` are **errors** — remove unused symbols.
- `noImplicitReturns` is enabled — every code path must return.
- `importsNotUsedAsValues: "error"` — always use `import type` for type-only imports.
- Target: `esnext`; module resolution: `node`.

```ts
// ✅ Correct — type-only import
import type { ITableProps } from '../../types';

// ❌ Wrong — value import for a type
import { ITableProps } from '../../types';
```

- Never use `as any`, `@ts-ignore`, or `@ts-expect-error`. Fix the actual type issue.
- Prefer `interface` for object shapes (props, params). Use `type` for unions, aliases, and mapped types.
- Prefix interfaces with `I` (e.g., `ITableProps`, `ITableColumn`).
- Prefix type aliases with `T` (e.g., `TSortType`, `TItem`, `TExpandable`).

---

## Code Style (Prettier + ESLint)

Enforced via `eslint-plugin-prettier`. Config is in `package.json`:

```json
{
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "quoteProps": "consistent"
}
```

- **Single quotes** for strings.
- **2-space indent** — no tabs.
- **Trailing commas** in multi-line arrays/objects/params (ES5 style).
- Line endings: `lf`; charset: `utf-8` (enforced by `.editorconfig`).
- Files must end with a newline; no trailing whitespace.

---

## Import Order Convention

```ts
// 1. React (named React hooks first, then React default)
import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';

// 2. React Native primitives
import { View, Animated, FlatList, TouchableOpacity } from 'react-native';

// 3. Third-party libraries
import { isArray, isEmpty, isFunction, isNil } from 'lodash';

// 4. Internal — styles (relative)
import styles from './styles';

// 5. Internal — sibling components (relative)
import Cell from '../Cell';
import Sort from '../Sort';

// 6. Internal — types (import type, relative)
import type { ITableProps, TItem } from '../../types';

// 7. Internal — constants/hooks (relative)
import { SORT_STATUS_MAP } from '../../constant';
import { useUpdateEffect } from '../../hooks';
```

---

## Component Patterns

- All components are wrapped with `memo(forwardRef(...))`:
  ```ts
  export default memo(forwardRef(ComponentName));
  ```
- Props are destructured directly in the function signature with TypeScript types.
- `ref` parameter is typed as `any` (forwardRef pattern used for imperative handles).
- Use `useImperativeHandle` to expose a minimal imperative API on refs.
- Prefix internal handlers with `_` (e.g., `_onPress`, `_onLayout`, `_onSortChange`).
- Internal render helpers are plain functions (not components), prefixed with `render`:
  ```ts
  const renderCell = () => { ... };
  const renderSort = () => { ... };
  ```
- Add `'use strict';` at the top of component files (see `Table/index.tsx`).

---

## Styles

- Each component has a co-located `styles.ts` using `StyleSheet.create({})`.
- Style objects are named semantically (e.g., `styles.content`, `styles.separator`).
- Inline styles only for dynamic values (transforms, widths from state).
- Compose styles as arrays: `style={[styles.base, dynamicStyle, propStyle]}`.

---

## Naming Conventions

| Entity            | Convention                         | Example           |
| ----------------- | ---------------------------------- | ----------------- |
| Component files   | PascalCase directory + `index.tsx` | `Cell/index.tsx`  |
| Style files       | `styles.ts` co-located             | `Cell/styles.ts`  |
| Interfaces        | `I` prefix, PascalCase             | `ITableProps`     |
| Type aliases      | `T` prefix, PascalCase             | `TSortType`       |
| Constants         | `UPPER_SNAKE_CASE`                 | `SORT_STATUS_MAP` |
| Hooks             | `use` prefix, camelCase            | `useUpdateEffect` |
| Internal handlers | `_` prefix, camelCase              | `_onPress`        |
| Render helpers    | `render` prefix, camelCase         | `renderCell`      |

---

## Error Handling

- No empty `catch` blocks.
- Use optional chaining (`?.`) liberally to guard against nil refs (e.g., `onPress?.()`, `treeConfig?.animationDuration`).
- Guard with lodash helpers: `isNil`, `isEmpty`, `isFunction`, `isArray` — prefer these over manual null checks.
- Do not `throw` inside render; handle missing data gracefully (return `null`).

---

## Testing

- Framework: **Jest** with `react-native` preset.
- Test files live in `src/__tests__/` with `.test.tsx` extension.
- Run a single test file:
  ```bash
  yarn test --testPathPattern="src/__tests__/index"
  ```
- Run a single test by name:
  ```bash
  yarn test -t "test name here"
  ```

---

## Git Commit Convention

Commits follow **Conventional Commits** (enforced by commitlint + husky):

```
feat: add tree expand animation
fix: reset sort state on column change
chore: release 0.4.0
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`, `ci`.

---

## Key Dependencies

- `lodash` — utility functions (`isArray`, `isEmpty`, `isFunction`, `isNil`). Prefer named imports.
- `react-native-builder-bob` — library build tool (outputs `lib/commonjs`, `lib/module`, `lib/typescript`).
- Do **not** add heavy new dependencies without justification; prefer RN built-ins.
