# Technical Project Overview: Antigravity Practice App

This document provides a clean, high-level overview of the Antigravity Expo mobile application, including technology stack, directory structure, navigation hierarchy, and feature inventory.

---

## 1. Technology Stack

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Expo SDK | `~57.0.24` | Universal React application platform |
| **Runtime** | React / React Native | `19.2.3` / `0.86.3` | Core UI engine & native component tree |
| **Routing** | Expo Router | `~57.0.22` | Typed file-based routing system |
| **Type Checker** | TypeScript | `~6.0.3` | Static type verification & IntelliSense |
| **Design System** | Custom Vanilla Tokens | — | Theme tokens (`src/constants/theme.ts`) |

---

## 2. Directory Architecture

```
/
├── docs/                         <-- Technical Architecture & Guide Documentation
│   ├── architecture.md           <-- Layer boundaries, constraints & engineering principles
│   ├── project_overview.md       <-- Tech stack, folder structure & feature inventory
│   └── quick_reference.md        <-- Step-by-step developer guide for adding new practice screens
├── AGENTS.md                     <-- Rules and instructions for AI agents
├── package.json                  <-- Project manifest (entry: "expo-router/entry")
├── tsconfig.json                 <-- TypeScript compiler config & "@/*" path alias
└── src/
    ├── app/                      <-- ROUTING LAYER ONLY (Thin Adapters ~3 lines)
    │   ├── _layout.tsx           <-- Root Stack, Providers & ErrorBoundary shield
    │   ├── index.tsx             <-- Root route -> @/features/practices
    │   └── pagination.tsx        <-- Pagination route -> @/features/pagination
    ├── features/                 <-- FEATURE / DOMAIN MODULES
    │   ├── practices/            <-- Practice Hub (List screen & search)
    │   └── pagination/           <-- Clean starter screen for Pagination practice
    ├── components/               <-- Shared primitive UI (Card, Input, ErrorBoundary)
    ├── constants/                <-- Design system tokens (Colors, Spacing, Typography)
    └── navigation/               <-- Centralized route constants (Routes object)
```

---

## 3. Navigation & Route Hierarchy

Navigation is handled by Expo Router using centralized typed routes:

```
Root Stack (_layout.tsx)
│
├── /                             --> features/practices (PracticeListScreen)
│                                     List of coding practice problems with search
│
└── /pagination                   --> features/pagination (PaginationPracticeScreen)
                                      Clean practice canvas with top navigation bar
```

---

## 4. Feature Inventory

### 1. Practice Hub (`src/features/practices/`)
* **Screen**: `PracticeListScreen`
* **Capabilities**:
  * Displays practice problems (e.g. Pagination, Progress Bar, Infinite Scroll).
  * Real-time search query filtering across titles, categories, and descriptions.
  * Simple card layout displaying title, category, description, and link.

### 2. Pagination Practice (`src/features/pagination/`)
* **Screen**: `PaginationPracticeScreen`
* **Capabilities**:
  * Clean canvas template for implementing pagination algorithms.
  * Includes top navigation bar with back button (`← Practice Hub`) and title (`Pagination Practice`).

---

## 5. Development Workflows

```bash
# Start Metro bundler
npx expo start

# Run type check
npx tsc --noEmit

# Run linting
npx expo lint
```
