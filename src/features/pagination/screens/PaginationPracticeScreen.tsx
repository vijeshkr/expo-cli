import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Spacing, Typography } from '@/constants/theme';

export const PaginationPracticeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Top Navigation Bar */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Practice Hub</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagination Practice</Text>
        <View style={{ width: 80 }} />
      </View>

      {/* Clean Practice Canvas */}
      <View style={styles.container}>
        {/* Your Pagination code goes here */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  backButton: {
    paddingVertical: Spacing.xs,
  },
  backText: {
    color: Colors.primaryLight,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
});
