import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';

export interface AppInputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const AppInput: React.FC<AppInputProps> = ({
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon}
      <TextInput
        placeholderTextColor={Colors.textMuted}
        style={[styles.input, style]}
        {...props}
      />
      {rightIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    height: 48,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.sm,
    height: '100%',
  },
});
