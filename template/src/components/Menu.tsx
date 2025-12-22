import { useTheme } from '@/theme/ThemeProvider';
import { scaler } from '@/utils/helpers';
import React, { FC, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Feather';

// 1. Update Interface to allow a Function as children
interface MenuProps {
  children:
    | React.ReactNode
    | ((args: { close: () => void }) => React.ReactNode);
  trigger?: React.ReactNode;
  containerStyle?: ViewStyle;
  menuWidth?: number;
  align?: 'left' | 'right' | 'center';
  onOpen?: () => void;
  onClose?: () => void;
}

export const Menu: FC<MenuProps> = ({
  children,
  trigger,
  containerStyle,
  menuWidth = 200,
  align = 'right',
  onOpen,
  onClose,
}) => {
  const { colors } = useTheme();
  const dropdownRef = useRef<any>(null);

  // 2. Define a helper to close the menu safely
  const closeMenu = () => {
    dropdownRef.current?.close();
    onClose?.();
  };

  const getAnchorStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      position: 'absolute',
      top: 0,
      width: scaler(menuWidth),
      height: '100%',
      zIndex: -1,
      opacity: 0,
    };

    switch (align) {
      case 'left':
        return { ...baseStyle, left: 0 };
      case 'center':
        return {
          ...baseStyle,
          left: '50%',
          transform: [{ translateX: -(scaler(menuWidth) / 2) }],
        };
      case 'right':
      default:
        return { ...baseStyle, right: 0 };
    }
  };

  const dummyData = [{ value: 'content' }];

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={getAnchorStyle()}>
        <Dropdown
          ref={dropdownRef}
          style={{ width: '100%', height: '100%' }}
          containerStyle={{
            backgroundColor: colors.background, // Ensures it matches theme
            borderRadius: scaler(12),
            borderColor: colors.border, // Visible border in dark mode
            borderWidth: 1,
            width: scaler(menuWidth),
            marginTop: scaler(10),

            // Shadows (Only visible in Light Mode)
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
            padding: scaler(4),
          }}
          activeColor={colors.input}
          data={dummyData}
          labelField="value"
          valueField="value"
          value={null}
          // 3. THE FIX: Check if children is a function and pass 'closeMenu'
          renderItem={() => (
            <View
              onStartShouldSetResponder={() => true}
              style={{ cursor: 'auto' }}
            >
              {typeof children === 'function'
                ? children({ close: closeMenu })
                : children}
            </View>
          )}
          onChange={() => onClose?.()}
          onFocus={onOpen}
          onBlur={onClose}
          renderRightIcon={() => null}
          renderLeftIcon={() => null}
          placeholder=""
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => dropdownRef.current?.open()}
        style={styles.trigger}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {trigger || (
          <Icon
            name="more-vertical"
            size={scaler(20)}
            color={colors.foreground}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 10,
  },
  trigger: {
    padding: scaler(4),
  },
});
