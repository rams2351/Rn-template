import { toastConfig } from '@/config/toastConfig';
import { useTheme } from '@/theme/ThemeProvider';
import { scaler } from '@/utils/helpers';
import React, { FC } from 'react';
import {
  Dimensions,
  Keyboard,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import RNModal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import { Text } from './Text';

// 1. Get Static Dimensions to prevent resize-flicker
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  type?: 'center' | 'bottom';
  avoidKeyboard?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Modal: FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  description,
  children,
  type = 'center',
  avoidKeyboard = true,
  style,
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const isBottom = type === 'bottom';

  const wrapperStyle: ViewStyle = isBottom
    ? { justifyContent: 'flex-end' }
    : { justifyContent: 'center', padding: scaler(20) };

  const contentStyle: ViewStyle = isBottom
    ? {
        borderTopLeftRadius: scaler(20),
        borderTopRightRadius: scaler(20),
        paddingBottom: insets.bottom + scaler(20),
        minHeight: scaler(200),
      }
    : { borderRadius: scaler(16) };

  const handleClose = () => {
    Keyboard.dismiss();
    onClose();
  };

  return (
    <RNModal
      isVisible={isVisible}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      avoidKeyboard={avoidKeyboard}
      // 2. THE FLICKER FIX CONFIGURATION
      useNativeDriver={true}
      useNativeDriverForBackdrop={true} // Force native driver for overlay
      hideModalContentWhileAnimating={false}
      // Lock Dimensions
      deviceHeight={DEVICE_HEIGHT}
      deviceWidth={DEVICE_WIDTH}
      // Eliminate "Fade Out" calculation on the backdrop
      backdropTransitionOutTiming={0}
      // Standard Animations
      animationIn={isBottom ? 'slideInUp' : 'zoomIn'}
      animationOut={isBottom ? 'slideOutDown' : 'zoomOut'}
      animationInTiming={300}
      animationOutTiming={300}
      backdropOpacity={0.4}
      // Swipe Logic
      onSwipeComplete={isBottom ? handleClose : undefined}
      swipeDirection={isBottom ? ['down'] : undefined}
      propagateSwipe={true}
      // Layout
      style={{ margin: 0 }}
      statusBarTranslucent={true}
      coverScreen={true}
    >
      <View style={[{ flex: 1 }, wrapperStyle]} pointerEvents="box-none">
        <View
          style={[
            styles.contentContainer,
            contentStyle,
            { backgroundColor: colors.background },
            style,
          ]}
        >
          {(title || !isBottom) && (
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
              <View style={{ flex: 1 }}>
                {title && (
                  <Text style={[styles.title, { color: colors.foreground }]}>
                    {title}
                  </Text>
                )}
                {description && (
                  <Text
                    style={[
                      styles.description,
                      { color: colors.mutedForeground },
                    ]}
                  >
                    {description}
                  </Text>
                )}
              </View>
              <TouchableOpacity onPress={handleClose} hitSlop={10}>
                <Icon
                  name="x"
                  size={scaler(22)}
                  color={colors.mutedForeground}
                />
              </TouchableOpacity>
            </View>
          )}
          <View>{children}</View>
        </View>
      </View>

      <Toast config={toastConfig} topOffset={0} />
    </RNModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: scaler(20),
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scaler(16),
  },
  title: {
    fontSize: scaler(18),
    fontWeight: '700',
    marginBottom: scaler(4),
  },
  description: {
    fontSize: scaler(14),
  },
});
