import { useTheme } from '@/theme/ThemeProvider';
import { scaler } from '@/utils/helpers';
import React, { FC, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import { Text } from '../Text';

export interface SelectItem {
  label: string;
  value: string;
}

export interface SelectProps {
  data: SelectItem[];
  value?: string;
  onChange?: (item: SelectItem) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  search?: boolean;
  containerStyle?: ViewStyle;
}

export const Select: FC<SelectProps> = ({
  data,
  value,
  onChange,
  label,
  placeholder = 'Select option',
  error,
  disabled,
  search = false,
  containerStyle,
}) => {
  const { colors, isDark } = useTheme();
  const [isFocus, setIsFocus] = useState(false);

  const borderColor = error
    ? colors.destructive
    : isFocus
    ? colors.primary
    : colors.border;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: colors.foreground }]}>
          {label}
        </Text>
      )}

      <Dropdown
        style={[
          styles.dropdown,
          {
            borderColor,
            backgroundColor: colors.background, // Input bg
            opacity: disabled ? 0.6 : 1,
          },
        ]}
        // --- 1. POPUP CONTAINER STYLES ---
        containerStyle={{
          backgroundColor: isDark ? '#1e1e1e' : colors.background, // Popup BG
          borderColor: colors.border,
          borderRadius: scaler(8),
          overflow: 'hidden',
        }}
        // --- 2. TEXT COLORS (Main Input) ---
        placeholderStyle={{
          color: colors.mutedForeground,
          fontSize: scaler(15),
        }}
        selectedTextStyle={{ color: colors.foreground, fontSize: scaler(15) }}
        inputSearchStyle={{ color: colors.foreground, fontSize: scaler(15) }}
        // --- 3. DROPDOWN LIST ITEM STYLES ---
        itemTextStyle={{ color: colors.foreground, fontSize: scaler(15) }}
        // The background color of the item currently being pressed or selected
        activeColor={isDark ? '#333333' : 'rgba(0,0,0,0.05)'}
        data={data}
        search={search}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setIsFocus(false);
          onChange?.(item);
        }}
        // --- 4. ICONS ---
        renderRightIcon={() => (
          <Icon
            style={styles.icon}
            color={isFocus ? colors.primary : colors.mutedForeground}
            name="chevron-down"
            size={20}
          />
        )}
      />

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
    marginBottom: scaler(16),
  },
  dropdown: {
    height: scaler(48),
    borderWidth: 1,
    borderRadius: scaler(8),
    paddingHorizontal: scaler(12),
  },
  label: {
    marginBottom: scaler(8),
    fontSize: scaler(14),
    fontWeight: '500',
  },
  icon: {
    marginRight: 5,
  },
  errorText: {
    marginTop: scaler(4),
    fontSize: scaler(12),
  },
});
