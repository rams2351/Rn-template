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
  const { style, animatedProps, animated, condensed, ...rest } = props;
  const { colors } = useTheme();

  const styles = useMemo(() => {
    const flatStyle = StyleSheet.flatten(style ?? {}) as any;

    const weight = flatStyle.fontWeight
      ? flatStyle.fontWeight.toString()
      : '400';

    // 1. Select the correct Map (Standard vs Condensed)
    const FontMap = condensed ? CondensedFonts : StandardFonts;

    let fontFamily = flatStyle?.fontFamily
      ? flatStyle?.fontFamily
      : (FontMap as any)[weight] || FontMap['400'];

    return StyleSheet.create({
      textStyle: {
        color: colors.foreground,
        fontSize: scaler(15),
        ...flatStyle,
        fontFamily,
        fontWeight: undefined,
        includeFontPadding: false,
        textAlignVertical: 'center',
      } as TextStyle,
    });
  }, [style, condensed, colors]);

  if (animated) {
    return (
      <Animated.Text
        {...rest}
        style={styles.textStyle}
        animatedProps={animatedProps}
        allowFontScaling={false}
        suppressHighlighting={true}
      />
    );
  }

  return (
    <RNText
      {...rest}
      style={styles.textStyle}
      allowFontScaling={false}
      suppressHighlighting={true}
    />
  );
};
