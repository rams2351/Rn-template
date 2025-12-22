import { useTheme } from '@/theme/ThemeProvider';
import { scaler } from '@/utils/helpers';
import React, { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Text } from './Text';

export interface CheckboxProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const Checkbox: FC<CheckboxProps> = ({
  value,
  onValueChange,
  label,
  disabled = false,
  error,
  containerStyle,
  labelStyle,
}) => {
  const { colors } = useTheme();

  // Dynamic Colors
  const borderColor = error
    ? colors.destructive
    : value
    ? colors.primary
    : colors.border;

  const backgroundColor = value
    ? disabled
      ? colors.muted
      : colors.primary
    : 'transparent';

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={disabled}
        onPress={() => onValueChange(!value)}
        style={styles.row}
      >
        {/* The Box */}
        <View
          style={[
            styles.box,
            {
              borderColor,
              backgroundColor,
              opacity: disabled ? 0.6 : 1,
            },
          ]}
        >
          {value && (
            <Icon
              name="check"
              size={scaler(14)}
              color="#FFFFFF" // Always white checkmark
            />
          )}
        </View>

        {/* The Label */}
        {label && (
          <Text
            style={[
              styles.label,
              { color: error ? colors.destructive : colors.foreground },
              labelStyle,
            ]}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>

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
  box: {
    width: scaler(22),
    height: scaler(22),
    borderRadius: scaler(6),
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scaler(10),
  },
  label: {
    fontSize: scaler(15),
    fontWeight: '500',
    flex: 1, // Allow text to wrap if long
  },
  errorText: {
    marginTop: scaler(4),
    marginLeft: scaler(32), // Align with text
    fontSize: scaler(12),
  },
});
