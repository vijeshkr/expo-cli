import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { likeButtonApi } from '../api/likeButtonApi';

export const LikeButtonPracticeScreen: React.FC = () => {
    const [liked, setLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLikePress = async () => {
        setIsLoading(true);
        try {
            const response = await likeButtonApi('like');
            console.log('response', response);
            if (response && response?.status >= 200 && response?.status < 300) {
                setLiked(!liked);
                setError('')
            } else {
                setError(response?.data?.message)
            }
        } catch (error) {
            setError('Something went wrong')
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

            {/* Top Navigation Bar */}
            <View style={styles.navHeader}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backText}>← Practice Hub</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Like Button Practice</Text>
                <View style={{ width: 80 }} />
            </View>

            {/* Clean Practice Canvas */}
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={handleLikePress}>
                    {isLoading ? <ActivityIndicator /> : <Text>❤️ </Text>}
                    <Text style={styles.buttonText}>{liked ? 'Liked' : 'like'}</Text>
                </TouchableOpacity>
                <Text style={styles.errorText}>{error && error}</Text>
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
    button: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: Spacing.xs,
        width: 90,
        height: 35,
        marginVertical: Spacing.xxxl,
        marginHorizontal: Spacing.xxxl,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonText: {
        color: Colors.textPrimary,
        fontWeight: '600',
    },
    errorText: {
        color: Colors.textPrimary,
        fontWeight: '600',
        marginTop: Spacing.lg
    }
});
