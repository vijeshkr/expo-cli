export const Colors = {
  // Background & Surfaces
  background: '#0B0F17',
  surface: '#151C28',
  surfaceLight: '#1E293B',
  surfaceHover: '#273549',
  border: '#2A364F',
  borderLight: '#3B4D6C',

  // Primary & Accent
  primary: '#6366F1',       // Indigo
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  accent: '#06B6D4',        // Cyan
  accentLight: '#22D3EE',

  // Status & Badges
  success: '#10B981',       // Emerald
  warning: '#F59E0B',       // Amber
  danger: '#EF4444',        // Rose
  info: '#3B82F6',          // Sky Blue

  // Difficulty Colors
  easy: '#10B981',
  medium: '#F59E0B',
  hard: '#EF4444',

  // Text Colors
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textOnPrimary: '#FFFFFF',

  // Overlay
  overlay: 'rgba(11, 15, 23, 0.8)',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const Typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
} as const;
