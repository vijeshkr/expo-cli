import { useState, useMemo } from 'react';
import { PRACTICE_PROBLEMS } from '../data/practiceRegistry';

export function usePracticeSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProblems = useMemo(() => {
    if (!searchQuery.trim()) return PRACTICE_PROBLEMS;

    const query = searchQuery.toLowerCase();
    return PRACTICE_PROBLEMS.filter(
      (problem) =>
        problem.title.toLowerCase().includes(query) ||
        problem.category.toLowerCase().includes(query) ||
        problem.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredProblems,
  };
}
