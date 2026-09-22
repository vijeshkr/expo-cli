import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AppCard } from '@/components';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { PracticeProblem } from '../types/practice.types';

interface PracticeCardProps {
  problem: PracticeProblem;
}

export const PracticeCard: React.FC<PracticeCardProps> = ({ problem }) => {
  const handlePress = () => {
    router.push(problem.route as any);
  };

  return (
    <AppCard onPress={handlePress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{problem.title}</Text>
        <Text style={styles.category}>{problem.category}</Text>
      </View>

      <Text style={styles.description}>{problem.description}</Text>

      <View style={styles.footer}>
        <Text style={styles.actionText}>Open Practice →</Text>
      </View>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },
  header: {
    marginBottom: Spacing.xs,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 2,
  },
  category: {
    color: Colors.accentLight,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  footer: {
    alignItems: 'flex-end',
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionText: {
    color: Colors.primaryLight,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
});
