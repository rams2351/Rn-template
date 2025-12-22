import { useTheme } from '@/theme/ThemeProvider';
import { scaler } from '@/utils/helpers';
import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from './Text';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  rightAction?: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'ghost';
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

export const Card: FC<CardProps> = ({
  children,
  title,
  description,
  footer,
  rightAction,
  variant = 'elevated',
  style,
  contentStyle,
}) => {
  const { colors, isDark } = useTheme(); // Assuming useTheme exposes 'dark' boolean or we infer it

  // Helper to detect dark mode if your hook doesn't export 'dark'
  // const isDarkMode = colors.background === '#000000' || colors.background === '#020817';

  // 1. Dynamic Container Styles
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: scaler(16),
      marginBottom: scaler(16),
      overflow: 'visible', // Ensure shadows can show (in light mode)
    };

    switch (variant) {
      case 'outlined':
        return {
          ...baseStyle,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: 'transparent',
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: isDark ? colors.input : 'rgba(0,0,0,0.03)',
        };
      case 'elevated':
      default:
        return {
          ...baseStyle,
          // Background: In dark mode, use a slightly lighter grey (colors.input or colors.card) to differentiate from screen black
          backgroundColor: isDark ? colors.input : colors.background,

          // Shadow/Elevation Logic
          ...(isDark
            ? {
                // DARK MODE: Shadows don't work. Use Border instead.
                borderWidth: 1,
                borderColor: colors.border,
                elevation: 0,
              }
            : {
                // LIGHT MODE: Use Shadows
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5,
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.04)',
              }),
        };
    }
  };

  const containerStyle = getContainerStyle();
  const radius = (containerStyle.borderRadius as number) || scaler(16);

  return (
    <View style={[containerStyle, style]}>
      {/* Header */}
      {(title || rightAction) && (
        <View
          style={[
            styles.header,
            {
              borderTopLeftRadius: radius,
              borderTopRightRadius: radius,
              // Divider line logic
              borderBottomWidth: 1,
              borderBottomColor: isDark
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.05)',
            },
          ]}
        >
          <View style={{ flex: 1, paddingRight: scaler(10) }}>
            {title && (
              <Text style={[styles.title, { color: colors.foreground }]}>
                {title}
              </Text>
            )}
            {description && (
              <Text
                style={[styles.description, { color: colors.mutedForeground }]}
                numberOfLines={2}
              >
                {description}
              </Text>
            )}
          </View>
          {rightAction && <View style={styles.action}>{rightAction}</View>}
        </View>
      )}

      {/* Content */}
      <View style={[styles.content, contentStyle]}>{children}</View>

      {/* Footer */}
      {footer && (
        <View
          style={[
            styles.footer,
            {
              borderTopColor: isDark
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.05)',
              borderBottomLeftRadius: radius,
              borderBottomRightRadius: radius,
              // Footer background slightly different
              backgroundColor: isDark
                ? 'rgba(255,255,255,0.03)'
                : 'rgba(0,0,0,0.02)',
            },
          ]}
        >
          {footer}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: scaler(16),
  },
  title: {
    fontSize: scaler(17),
    fontWeight: '700',
    marginBottom: scaler(4),
  },
  description: {
    fontSize: scaler(13),
    lineHeight: scaler(18),
  },
  action: {
    marginTop: scaler(2),
  },
  content: {
    padding: scaler(16),
    paddingTop: scaler(8),
  },
  footer: {
    padding: scaler(12),
    paddingHorizontal: scaler(16),
    borderTopWidth: 1,
  },
});
