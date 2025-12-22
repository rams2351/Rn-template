import { useTheme } from '@/theme/ThemeProvider';
import { scaler } from '@/utils/helpers';
import React, { FC, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import RNDatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Feather';
import { Text } from './Text';

export interface DatePickerProps {
  // Data
  value?: Date;
  onChange?: (date: Date) => void;

  // UI
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  mode?: 'date' | 'time' | 'datetime';

  // Styling
  containerStyle?: StyleProp<ViewStyle>;

  // Format options (Optional custom text formatter)
  formatDate?: (date: Date) => string;
}

export const DatePicker: FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  error,
  disabled,
  mode = 'date',
  containerStyle,
  formatDate,
}) => {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [internalDate, setInternalDate] = useState(value || new Date());

  // Helper to format date if no custom formatter is passed
  const getDisplayText = () => {
    if (!value) return null;
    if (formatDate) return formatDate(value);

    // Default formatting
    if (mode === 'time') {
      return value.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return value.toLocaleDateString();
  };

  const displayText = getDisplayText();

  // Dynamic Styles
  const borderColor = error ? colors.destructive : colors.input;
  const backgroundColor = disabled ? colors.muted : colors.input;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: colors.foreground }]}>
          {label}
        </Text>
      )}

      {/* Trigger Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}
        style={[styles.trigger, { backgroundColor, borderColor }]}
      >
        <Text
          style={[
            styles.valueText,
            { color: displayText ? colors.foreground : colors.mutedForeground },
          ]}
        >
          {displayText || placeholder}
        </Text>

        <Icon
          name={mode === 'time' ? 'clock' : 'calendar'}
          size={scaler(18)}
          color={colors.mutedForeground}
        />
      </TouchableOpacity>

      {/* Error Text */}
      {error && (
        <Text style={[styles.errorText, { color: colors.destructive }]}>
          {error}
        </Text>
      )}

      {/* The Actual Modal Picker */}
      <RNDatePicker
        modal
        open={open}
        date={internalDate}
        mode={mode}
        theme={colors.background === '#ffffff' ? 'light' : 'dark'} // Auto-theme
        onConfirm={date => {
          setOpen(false);
          setInternalDate(date);
          onChange?.(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scaler(16),
  },
  label: {
    marginBottom: scaler(8),
    fontSize: scaler(14),
    fontWeight: '500',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: scaler(10),
    height: scaler(48),
    paddingHorizontal: scaler(12),
  },
  valueText: {
    fontSize: scaler(15),
    flex: 1,
  },
  errorText: {
    marginTop: scaler(4),
    fontSize: scaler(12),
  },
});
