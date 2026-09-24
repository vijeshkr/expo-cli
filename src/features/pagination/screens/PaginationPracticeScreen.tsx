import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { fetchProducts } from '../api/paginationApi';

interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

const ITEMS_PER_PAGE = 4;

export const PaginationPracticeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProducts();
        if (data && data?.products) {
          console.log('data', data?.products[0]?.thumbnail);
          setProducts(data?.products)

        } else {
          console.log('api fails');

        }
      } catch (error) {
        console.log('error', error);

      }
    }
    loadData();
  }, [])

  const totalPage = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProduct = products.slice(startIndex, endIndex);

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
        {
          products?.length > 0 && <View>
            <FlatList
              data={paginatedProduct}
              keyExtractor={(item) => item?.id.toString()}
              renderItem={({ item }) => {
                return (
                  <View style={styles.card}>
                    <Image source={{ uri: item?.thumbnail }}
                      style={styles.thumbnail} />
                    <Text style={styles.title}>{item?.title}</Text>
                  </View>
                )
              }}
            />

            <View style={styles.paginationContainer}>
              <TouchableOpacity style={[styles.pageButton, page === 1 && styles.disabledButton]}
                disabled={page === 1} onPress={() => setPage((prev) => Math.max(prev - 1, 1))}><Text style={styles.buttonText}>Previous</Text></TouchableOpacity>

              <Text style={styles.pageInfoText}>
                Page {page} of {totalPage}
              </Text>

              <TouchableOpacity style={[styles.pageButton, page === totalPage && styles.disabledButton]}
                disabled={page === totalPage} onPress={() => setPage((prev) => Math.min(prev + 1, totalPage))}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
            </View>
          </View>
        }
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
  card: {
    alignItems: 'center',
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: Spacing.xs,
    backgroundColor: Colors.accent,
    marginHorizontal: Spacing.lg
  },
  thumbnail: {
    width: 125,
    height: 125,
    borderRadius: Spacing.sm
  },
  title: {
    color: '#ffffff',
    fontSize: Typography.fontSize.md,
    fontWeight: '600',
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  pageButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.xs,
  },
  disabledButton: {
    opacity: 0.4,
  },
  buttonText: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  pageInfoText: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
});
