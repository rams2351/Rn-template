import { useTheme } from '@/theme/ThemeProvider';
import { scaler } from '@/utils/helpers';
import React, { FC, useMemo } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { Text } from './Text'; // Your custom Text component

// 1. Define Types
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'destructive'
  | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  // Content
  title?: string;
  children?: React.ReactNode;

  // Loading State
  loading?: boolean;
  loadingTitle?: string; // Text to show specifically when loading

  // Styles
  variant?: ButtonVariant;
  size?: ButtonSize;

  // Icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  // Custom Styles
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
  title,
  children,
  loading = false,
  fullWidth = false,
  loadingTitle,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  style,
  textStyle,
  disabled,
  ...rest
}) => {
  const { colors } = useTheme();

  // 2. Compute Styles based on Props & Theme
  const styles = useMemo(() => {
    // A. Size Configuration
    let height = scaler(48);
    let paddingHorizontal = scaler(20);
    let fontSize = scaler(15);
    let iconSpacing = scaler(8);

    switch (size) {
      case 'sm':
        height = scaler(36);
        paddingHorizontal = scaler(12);
        fontSize = scaler(13);
        iconSpacing = scaler(6);
        break;
      case 'lg':
        height = scaler(56);
        paddingHorizontal = scaler(24);
        fontSize = scaler(17);
        iconSpacing = scaler(10);
        break;
    }

    // B. Variant Configuration (Colors)
    // Default: Primary
    let backgroundColor = colors.primary;
    let borderColor = 'transparent';
    let borderWidth = 0;
    let textColor = colors.primaryForeground;

    switch (variant) {
      case 'secondary':
        backgroundColor = colors.secondary;
        textColor = colors.secondaryForeground;
        break;
      case 'outline':
        backgroundColor = 'transparent';
        borderColor = colors.primary;
        borderWidth = 1;
        textColor = colors.primary;
        break;
      case 'destructive':
        backgroundColor = colors.destructive;
        textColor = colors.destructiveForeground;
        break;
      case 'ghost':
        backgroundColor = 'transparent';
        textColor = colors.foreground;
        break;
    }

    // C. Disabled / Loading State Opacity
    const opacity = disabled || loading ? 0.6 : 1;

    return {
      container: {
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scaler(10), // Modern rounded corners
        paddingHorizontal,
        backgroundColor,
        borderColor,
        borderWidth,
        opacity,
        ...StyleSheet.flatten(style),
        ...(fullWidth ? { width: '100%' } : undefined),
      } as ViewStyle,
      text: {
        color: textColor,
        fontSize,
        fontWeight: '600', // Semibold usually looks best on buttons
        textAlign: 'center',
        ...StyleSheet.flatten(textStyle),
      } as TextStyle,
      iconSpacerLeft: {
        marginRight: iconSpacing,
      } as ViewStyle,
      iconSpacerRight: {
        marginLeft: iconSpacing,
      } as ViewStyle,
    };
  }, [variant, size, colors, disabled, loading, style, textStyle, fullWidth]);

  // 3. Helper to determine what text to display
  const content = useMemo(() => {
    if (loading && loadingTitle) return loadingTitle;
    if (title) return title;
    return children;
  }, [loading, loadingTitle, title, children]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || loading}
      style={styles.container}
      {...rest}
    >
      {/* A. Loading Spinner */}
      {loading ? (
        <ActivityIndicator
          size="small"
          color={styles.text.color} // Spinner matches text color
          style={
            loadingTitle ? styles.iconSpacerLeft : { marginRight: scaler(10) }
          }
        />
      ) : (
        /* B. Left Icon (Only if not loading) */
        leftIcon && <View style={styles.iconSpacerLeft}>{leftIcon}</View>
      )}

      {/* C. Text Label */}
      {content && (
        <Text style={styles.text} numberOfLines={1}>
          {content}
        </Text>
      )}

      {/* D. Right Icon (Only if not loading) */}
      {!loading && rightIcon && (
        <View style={styles.iconSpacerRight}>{rightIcon}</View>
      )}
    </TouchableOpacity>
  );
};
