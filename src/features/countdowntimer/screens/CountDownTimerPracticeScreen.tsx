import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';


export const CountDownTimerPracticeScreen: React.FC = () => {
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);
    const [running, setRunning] = useState('start');
    const intervalRef: any = useRef(null);

    const start = () => {
        if (second == 0 && minute == 0 && hour == 0) return;
        setRunning('running');
        intervalRef.current = setInterval(() => {
            timer();
        }, 1000)
    }

    const timer = () => {
        setSecond((prevSec) => {
            if (prevSec > 0) {
                return prevSec - 1;
            }
            setMinute((prevMin) => {
                if (prevMin > 0) {
                    return prevMin - 1;
                }
                setHour((prevHour) => {
                    if (prevHour > 0) {
                        return prevHour - 1;
                    }
                    if (intervalRef.current !== null) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                    setRunning('start');
                    return 0;
                })
                return 59;
            })
            return 59;
        })
    }

    const resume = () => {
        clearInterval(intervalRef.current);
        intervalRef.current == null;
        setRunning('pause');
    }

    const reset = () => {
        clearInterval(intervalRef.current);
        intervalRef.current == null;
        setSecond(0);
        setMinute(0);
        setHour(0);
        setRunning('start');
    }

    const handleOnPress = () => {
        running === 'running' ? resume() : start();
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

            {/* Top Navigation Bar */}
            <View style={styles.navHeader}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backText}>← Practice Hub</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Count Down Timer Practice</Text>
                <View style={{ width: 80 }} />
            </View>

            {/* Clean Practice Canvas */}
            <View style={styles.container}>
                {/* Time */}
                <View style={{ flexDirection: 'row' }}>
                    {/* Hours */}
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 100,
                        padding: Spacing.lg,
                        borderWidth: 1,
                        borderColor: Colors.border,
                        borderRadius: BorderRadius.lg,
                        marginHorizontal: 10,
                        height: 130
                    }}>
                        <TextInput
                            placeholder='0'
                            keyboardType='number-pad'
                            style={styles.input}
                            maxLength={2}
                            onChangeText={(sec) => setHour(Number(sec))}
                            value={String(hour)}
                        />
                        <Text style={styles.title}>Hours</Text>
                    </View>
                    {/* Minutes */}
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 100,
                        padding: Spacing.lg,
                        borderWidth: 1,
                        borderColor: Colors.border,
                        borderRadius: BorderRadius.lg,
                        marginHorizontal: 10,
                        height: 130
                    }}>
                        <TextInput
                            placeholder='0'
                            keyboardType='number-pad'
                            style={styles.input}
                            maxLength={2}
                            onChangeText={(min) => {
                                if (Number(min) <= 60) {
                                    setMinute(Number(min))
                                } else {
                                    setHour(prev => prev + 1);
                                    setMinute(Number(min) - 60)
                                }
                            }}
                            value={String(minute)}
                        />
                        <Text style={styles.title}>Minutes</Text>
                    </View>
                    {/* Seconds */}
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 100,
                        padding: Spacing.lg,
                        borderWidth: 1,
                        borderColor: Colors.border,
                        borderRadius: BorderRadius.lg,
                        marginHorizontal: 10,
                        height: 130
                    }}>
                        <TextInput
                            placeholder='0'
                            keyboardType='number-pad'
                            style={styles.input}
                            maxLength={2}
                            onChangeText={(sec) => {
                                if (Number(sec) <= 60) {
                                    setSecond(Number(sec))
                                } else {
                                    setMinute(prev => prev + 1);
                                    setSecond(Number(sec) - 60)
                                }
                            }}
                            value={String(second)}
                        />
                        <Text style={styles.title}>Seconds</Text>
                    </View>
                </View>
                {/* Buttons */}
                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                    <TouchableOpacity style={{
                        backgroundColor: running === 'running' ? Colors.warning : Colors.easy,
                        width: 100,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: BorderRadius.md,
                        marginHorizontal: 10
                    }}
                        onPress={handleOnPress}>
                        <Text style={styles.buttonText}>
                            {running === 'running' ? 'Pause' : running === 'pause' ? 'Resume' : 'Start'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: Colors.danger,
                        width: 100,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: BorderRadius.md,
                        marginHorizontal: 10
                    }}
                        onPress={reset}>
                        <Text style={styles.buttonText}>
                            Reset
                        </Text>
                    </TouchableOpacity>
                </View>

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
        alignItems: 'center',
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
    disabledButton: {
        opacity: 0.4,
    },
    buttonText: {
        color: Colors.textPrimary,
        fontWeight: '600',
        fontSize: Typography.fontSize.md
    },
    pageInfoText: {
        color: Colors.textPrimary,
        fontWeight: '600',
    },
    input: {
        fontSize: Typography.fontSize.xxxl,
        color: Colors.textPrimary
    }
});
