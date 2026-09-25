import { PracticeProblem } from '../types/practice.types';

/**
 * Registry of practice problems.
 * To add a new problem:
 * 1. Build screen in src/features/<new-feature>/
 * 2. Add route in src/navigation/routes.ts & src/app/<route>.tsx
 * 3. Add item entry here.
 */
export const PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: 'pagination',
    title: '1. Pagination System',
    category: 'UI Components & State',
    description:
      'Client-side pagination algorithm with page number generation, item slicing, and page size control.',
    route: '/pagination',
  },
  {
    id: 'likebutton',
    title: '2. Like Button',
    category: 'UI Components & State',
    description:
      'Like Button with loading and clicked state',
    route: '/likebutton',
  },
];
