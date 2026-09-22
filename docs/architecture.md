# Architecture & Boundary Guidelines

This document specifies the architectural principles, layer boundaries, and structural rules for the Antigravity Expo codebase.

---

## 1. Core Architectural Philosophy

This project implements **Feature-First Architecture** (Screaming Architecture) combined with a **Thin-Layer Expo Router** setup.

### The Golden Rule
> **`src/app/` is strictly a routing adapter layer.** Business logic, screen layouts, hooks, and local UI components must **NEVER** live directly in `src/app/`.

---

## 2. Directory & Layer Boundaries

```
src/
├── app/                          <-- LAYER 1: Routing Layer (Thin Adapters ~3 lines)
├── features/                     <-- LAYER 2: Feature Domain Modules (Self-contained)
├── components/                   <-- LAYER 3: Shared UI Primitives (AppCard, AppInput, ErrorBoundary)
├── constants/                    <-- LAYER 4: Theme Constants & Tokens
└── navigation/                   <-- LAYER 5: Centralized Route Constants & Types
```

---

## 3. Layer Specific Rules & Constraints

### Layer 1: Routing Layer (`src/app/`)
* **Role**: Map file system routes to features and define layout navigators (`<Stack>`).
* **Maximum File Size**: ~3 to 10 lines for route files.
* **Pattern**:
  ```tsx
  import { ScreenName } from '@/features/<feature-name>';

  export default ScreenName;
  ```

---

### Layer 2: Feature Layer (`src/features/<feature-name>/`)
* **Role**: Encapsulated feature module for a specific screen or practice domain.
* **Standard Feature Structure**:
  ```
  src/features/<feature-name>/
  ├── screens/          <-- Full screen components (e.g., PaginationPracticeScreen.tsx)
  ├── components/       <-- Feature subcomponents (if needed)
  ├── hooks/            <-- Feature state & logic hooks (if needed)
  └── index.ts          <-- PUBLIC BARREL EXPORT (The only exposed entry point)
  ```

---

### Layer 3: Shared Components (`src/components/`)
* **Role**: Domain-agnostic UI primitives (`AppCard`, `AppInput`, `ErrorBoundary`).
* Consumes styling tokens from `@/constants/theme`.

---

### Layer 4: Theme Constants (`src/constants/theme.ts`)
* **Role**: Single source of truth for design tokens (Colors, Spacing, Typography).

---

### Layer 5: Centralized Routes (`src/navigation/routes.ts`)
* **Role**: Centralized object defining route URLs (`Routes.Home`, `Routes.Pagination`).

---

## 4. Architectural Enforcement Checklist

Before committing or pushing code:
- [ ] Is any file in `src/app/` longer than a thin adapter (excluding `_layout.tsx`)?
- [ ] Does the screen component live inside `src/features/<feature>/screens/`?
- [ ] Is the screen exported through `src/features/<feature>/index.ts`?
- [ ] Are path aliases (`@/...`) used instead of relative paths (`../../..`)?
- [ ] Did `npx tsc --noEmit` pass with zero errors?
