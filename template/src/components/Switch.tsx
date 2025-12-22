import { useTheme } from '@/theme/ThemeProvider';
import { scaler } from '@/utils/helpers';
import React, { FC, useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from './Text';

export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Switch: FC<SwitchProps> = ({
  value,
  onValueChange,
  label,
  disabled = false,
  error,
  containerStyle,
}) => {
  const { colors } = useTheme();

  // Animation Value (0 = Off, 1 = On)
  const animValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  // Sync animation when value changes externally
  useEffect(() => {
    Animated.timing(animValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // simpler for layout colors/width
    }).start();
  }, [value]);

  const toggleSwitch = () => {
    if (disabled) return;
    const newValue = !value;
    onValueChange(newValue);
  };

  // Interpolations
  const trackColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.muted, colors.primary], // Grey to Primary
  });

  const thumbTranslate = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // Move from left (2px) to right (22px)
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.row}>
        {/* Custom Touchable Switch */}
        <Pressable onPress={toggleSwitch} disabled={disabled} hitSlop={10}>
          <Animated.View
            style={[
              styles.track,
              { backgroundColor: trackColor, opacity: disabled ? 0.6 : 1 },
            ]}
          >
            <Animated.View
              style={[
                styles.thumb,
                { transform: [{ translateX: thumbTranslate }] },
              ]}
            />
          </Animated.View>
        </Pressable>

        {/* Label */}
        {label && (
          <Pressable
            onPress={toggleSwitch}
            disabled={disabled}
            style={{ flex: 1 }}
          >
            <Text
              style={[
                styles.label,
                {
                  color: disabled ? colors.mutedForeground : colors.foreground,
                },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        )}
      </View>

      {/* Error Message */}
      {error && (
        <Text style={[styles.errorText, { color: colors.destructive }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scaler(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    width: scaler(44), // Standard Width
    height: scaler(24), // Standard Height
    borderRadius: scaler(12), // Pill shape
    justifyContent: 'center',
    padding: 2, // Padding for thumb
  },
  thumb: {
    width: scaler(20),
    height: scaler(20),
    borderRadius: scaler(10), // Circle
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2, // Android Shadow
  },
  label: {
    marginLeft: scaler(12),
    fontSize: scaler(15),
    fontWeight: '500',
  },
  errorText: {
    marginTop: scaler(4),
    fontSize: scaler(12),
  },
});
