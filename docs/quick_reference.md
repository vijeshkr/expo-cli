# Quick Reference Guide: Adding New Practice Screens

This guide provides simple, step-by-step instructions on how to create a new coding practice problem screen, wire up navigation, register it in the Practice Hub, and maintain clean layer boundaries.

---

## Workflow Overview (7 Steps)

When you create a new Git branch to practice a new machine round problem (e.g., `Progress Bar`, `Accordion`, `Infinite Scroll`, `Custom Toast`):

```
1. Create Feature Folder  --> src/features/<feature-name>/
2. Create Feature Code    --> hooks, components, screen
3. Create Barrel Export   --> src/features/<feature-name>/index.ts
4. Add Centralized Route  --> src/navigation/routes.ts
5. Add Thin Route Adapter --> src/app/<route>.tsx
6. Register in Registry   --> src/features/practices/data/practiceRegistry.ts
7. Run Typecheck          --> npx tsc --noEmit
```

---

## Detailed Step-by-Step Guide

### Step 1: Create Feature Directory Structure
Create a new directory under `src/features/` with standard subfolders:

```
src/features/progress_bar/
├── components/       <-- Feature subcomponents
├── hooks/            <-- Feature state & logic hooks
├── screens/          <-- Main screen component
├── types/            <-- TypeScript definitions
└── index.ts          <-- Public barrel export
```

---

### Step 2: Implement Feature Screen & Logic

#### 1. Define Types (`src/features/progress_bar/types/progress.types.ts`)
```ts
export interface ProgressBarState {
  progress: number;
  isRunning: boolean;
}
```

#### 2. Implement Logic Hook (`src/features/progress_bar/hooks/useProgressBar.ts`)
```ts
import { useState, useEffect } from 'react';

export function useProgressBar(initialProgress = 0) {
  const [progress, setProgress] = useState(initialProgress);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsRunning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isRunning]);

  return { progress, setProgress, isRunning, setIsRunning };
}
```

#### 3. Implement Screen (`src/features/progress_bar/screens/ProgressBarPracticeScreen.tsx`)
```tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AppCard, AppButton } from '@/components';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { useProgressBar } from '../hooks/useProgressBar';

export const ProgressBarPracticeScreen: React.FC = () => {
  const { progress, setProgress, isRunning, setIsRunning } = useProgressBar(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Practice Hub</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Progress Bar Practice</Text>
      </View>

      <View style={styles.content}>
        <AppCard style={styles.card}>
          <Text style={styles.title}>Progress: {progress}%</Text>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${progress}%` }]} />
          </View>

          <View style={styles.btnRow}>
            <AppButton
              title={isRunning ? 'Pause' : 'Start Progress'}
              onPress={() => setIsRunning(!isRunning)}
            />
            <AppButton
              title="Reset"
              variant="outline"
              onPress={() => {
                setIsRunning(false);
                setProgress(0);
              }}
            />
          </View>
        </AppCard>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: Colors.surface,
  },
  backText: { color: Colors.primaryLight, fontWeight: '600' },
  headerTitle: { color: Colors.textPrimary, fontWeight: '700', fontSize: Typography.fontSize.md },
  content: { padding: Spacing.lg },
  card: { gap: Spacing.md },
  title: { color: Colors.textPrimary, fontWeight: '600' },
  track: { height: 12, backgroundColor: Colors.surfaceLight, borderRadius: 6, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: Colors.primary },
  btnRow: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.sm },
});
```

---

### Step 3: Create Barrel Export (`src/features/progress_bar/index.ts`)
```ts
export * from './screens/ProgressBarPracticeScreen';
```

---

### Step 4: Register Route Constant (`src/navigation/routes.ts`)
Add the new path to the centralized `Routes` object:

```ts
export const Routes = {
  Home: '/',
  Pagination: '/pagination',
  ProgressBar: '/progress-bar', // <-- Added
} as const;
```

---

### Step 5: Create Thin App Route Adapter (`src/app/progress-bar.tsx`)
Create a **thin adapter file** in `src/app/` (~3 lines):

```tsx
import { ProgressBarPracticeScreen } from '@/features/progress_bar';

export default ProgressBarPracticeScreen;
```

---

### Step 6: Add to Practice Registry (`src/features/practices/data/practiceRegistry.ts`)
Add the simple metadata entry (`title`, `category`, `description`, `route`) to `PRACTICE_PROBLEMS`:

```ts
export const PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: 'pagination',
    title: '1. Pagination System',
    category: 'UI Components & State',
    description: 'Client-side pagination algorithm with page number generation and data slicing.',
    route: '/pagination',
  },
  {
    id: 'progress-bar',
    title: '2. Animated Progress Bar',
    category: 'UI & Timers',
    description: 'Stateful progress indicator with interval timer, pause/resume, and reset controls.',
    route: '/progress-bar',
  },
];
```

---

### Step 7: Verify Typecheck & Test
Run TypeScript compiler check to verify zero type errors:

```bash
npx tsc --noEmit
```

Open the app:
1. The new problem card **"2. Animated Progress Bar"** will automatically appear in the Practice Hub list!
2. Tapping on the card will navigate directly to `/progress-bar`.
3. Tapping **Back** returns to the Practice Hub.
