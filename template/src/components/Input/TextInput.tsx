import { StandardFonts } from '@/theme/Fonts';
import { useTheme } from '@/theme/ThemeProvider';
import { scaler } from '@/utils/helpers';
import React, { forwardRef, useState } from 'react';
import {
  TextInput as RnTextInput,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Text } from '../Text';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

export const TextInput = forwardRef<RnTextInput, InputProps>((props, ref) => {
  const {
    label,
    error,
    leftComponent,
    rightComponent,
    containerStyle,
    inputStyle,
    secureTextEntry,
    fullWidth = true,
    onFocus,
    onBlur,
    style,
    ...rest
  } = props;

  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // Determine Border Color
  let borderColor = colors.input;
  let titleColor = colors.foreground;
  if (error) {
    borderColor = colors.destructive;
    titleColor = colors.destructive;
  } // Red on error
  else if (isFocused) borderColor = colors.primary; // Brand color on focus

  return (
    <View
      style={[
        styles.container,
        fullWidth ? { width: '100%' } : undefined,
        containerStyle,
      ]}
    >
      {/* Label */}
      {label && (
        <Text style={[styles.label, { color: titleColor }]}>{label}</Text>
      )}

      {/* Input Field Wrapper */}
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.background, // Background from palette
            borderColor: borderColor,
          },
        ]}
      >
        {leftComponent && (
          <View style={styles.leftComponent}>{leftComponent}</View>
        )}

        <RnTextInput
          ref={ref}
          style={[
            styles.textInput,
            { color: colors.foreground, fontFamily: StandardFonts[500] },
            inputStyle,
          ]}
          placeholderTextColor={colors.mutedForeground}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isSecure}
          cursorColor={colors.primary}
          selectionColor={colors.primary}
          {...rest}
        />

        {/* Right Component OR Password Toggle */}
        {secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            style={styles.rightComponent}
          >
            {/* Replace this Text with an Icon later if you prefer */}
            <Text
              style={{ fontSize: scaler(12), color: colors.mutedForeground }}
            >
              <Icon
                size={scaler(13)}
                color={colors.foreground}
                name={isSecure ? 'eye' : 'eye-off'}
              />
            </Text>
          </TouchableOpacity>
        ) : (
          rightComponent && (
            <View style={styles.rightComponent}>{rightComponent}</View>
          )
        )}
      </View>

      {/* Error Message */}
      {error && (
        <Text
          style={[
            styles.errorText,
            {
              color: colors.destructive,
              fontSize: scaler(10),
              fontWeight: '500',
              fontStyle: 'italic',
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: scaler(16),
  },
  label: {
    marginBottom: scaler(8),
    fontSize: scaler(14),
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: scaler(10),
    height: scaler(48),
    paddingHorizontal: scaler(12),
  },
  textInput: {
    flex: 1,
    fontSize: scaler(15),
    height: '100%',
    paddingVertical: 0,
  },
  leftComponent: {
    marginRight: scaler(10),
  },
  rightComponent: {
    marginLeft: scaler(10),
  },
  errorText: {
    marginTop: scaler(4),
    fontSize: scaler(12),
  },
});
