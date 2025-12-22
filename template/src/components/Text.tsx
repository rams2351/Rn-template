import { CondensedFonts, StandardFonts } from '@/theme/Fonts';
import { useTheme } from '@/theme/ThemeProvider';
import { scaler } from '@/utils/helpers';
import React, { FC, useMemo } from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  StyleSheet,
  TextStyle,
} from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';

type CustomFontWeight =
  | TextStyle['fontWeight']
  | 'semiBold'
  | 'extraBold'
  | 'extraLight'
  | 'thin'
  | 'black';

interface CustomTextStyle extends Omit<TextStyle, 'fontWeight'> {
  fontWeight?: CustomFontWeight;
}

interface TextProps extends Omit<RNTextProps, 'style'> {
  style?: StyleProp<CustomTextStyle>;
  animated?: boolean;
  animatedProps?: AnimatedProps<RNTextProps>['animatedProps'];
  children?: React.ReactNode;
  // New Prop to toggle Condensed family
  condensed?: boolean;
}

export const Text: FC<TextProps> = props => {
  const {
    style,
    animatedProps,
    animated,
    allowFontScaling = false,
    condensed,
    ...rest
  } = props;
  const { colors } = useTheme();

  const styles = useMemo(() => {
    const flatStyle = StyleSheet.flatten(style ?? {}) as any;

    let rawWeight = flatStyle.fontWeight?.toString() || '400';
    if (rawWeight === 'bold') rawWeight = '700';
    if (rawWeight === 'normal') rawWeight = '400';

    // 1. Select the correct Map (Standard vs Condensed)
    const FontMap = condensed ? CondensedFonts : StandardFonts;

    const fontFamily = flatStyle?.fontFamily
      ? flatStyle?.fontFamily
      : (FontMap as any)[rawWeight] || FontMap['400'];

    return {
      color: colors.foreground,
      fontSize: scaler(15),
      ...flatStyle,
      fontFamily,
      fontWeight: undefined,
      includeFontPadding: false,
      textAlignVertical: 'center',
    } as TextStyle;
  }, [style, condensed, colors]);

  const commonProps = {
    ...rest,
    allowFontScaling,
    suppressHighlighting: true,
  };

  if (animated) {
    return (
      <Animated.Text
        {...commonProps}
        style={styles}
        animatedProps={animatedProps}
      />
    );
  }

  return <RNText {...commonProps} style={styles} />;
};
