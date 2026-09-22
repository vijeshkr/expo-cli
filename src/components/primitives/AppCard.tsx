import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewProps, TouchableOpacityProps } from 'react-native';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';

export interface AppCardProps extends ViewProps {
  onPress?: () => void;
  activeOpacity?: number;
  elevated?: boolean;
}

export const AppCard: React.FC<AppCardProps> = ({
  children,
  onPress,
  activeOpacity = 0.8,
  elevated = false,
  style,
  ...props
}) => {
  const cardStyle = [
    styles.card,
    elevated ? Shadows.md : {},
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={onPress}
        style={cardStyle}
        {...(props as TouchableOpacityProps)}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
});
