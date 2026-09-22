import React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppInput } from '@/components';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { usePracticeSearch } from '../hooks/usePracticeSearch';
import { PracticeCard } from '../components/PracticeCard';

export const PracticeListScreen: React.FC = () => {
  const { searchQuery, setSearchQuery, filteredProblems } = usePracticeSearch();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <View style={styles.container}>
        {/* Simple Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>Coding Practice Hub</Text>
          <Text style={styles.subtitle}>Machine Round Practice Problems</Text>
        </View>

        {/* Search Input */}
        <AppInput
          placeholder="Search practice problems..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={styles.searchBar}
        />

        {/* Problems List */}
        <FlatList
          data={filteredProblems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PracticeCard problem={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No problems found</Text>
              <Text style={styles.emptySub}>Try typing a different keyword.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  header: {
    marginBottom: Spacing.md,
  },
  appTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    marginTop: 2,
  },
  searchBar: {
    marginBottom: Spacing.md,
  },
  listContent: {
    paddingBottom: Spacing.xxl,
  },
  emptyContainer: {
    padding: Spacing.xxl,
    alignItems: 'center',
  },
  emptyTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xs,
  },
  emptySub: {
    color: Colors.textMuted,
    fontSize: Typography.fontSize.xs,
  },
});
