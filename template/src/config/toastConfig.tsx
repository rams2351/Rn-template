import { Text } from '@/components/Text';
import { Colors } from '@/theme/Colors';
import { StandardFonts } from '@/theme/Fonts';
import { scaler } from '@/utils/helpers';
import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToastConfig } from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
// Reusable Banner Component to DRY up the code and use Hooks
const ToastBanner = ({ type, text1, text2, hide }: any) => {
  const insets = useSafeAreaInsets(); // Get exact notch height

  // Dynamic Background Colors
  let backgroundColor;
  let iconName;

  switch (type) {
    case 'success':
      backgroundColor = Colors.light.success;
      iconName = 'check-circle';
      break;
    case 'error':
      backgroundColor = Colors.light.destructive;
      iconName = 'exclamation-circle';
      break;
    default: // info
      backgroundColor = Colors.light.info;
      iconName = 'info-circle';
      break;
  }

  return (
    <View
      style={[
        styles.baseBanner,
        {
          backgroundColor,
          // Dynamic Padding: Notch + 10px spacing
          paddingTop: insets.top + scaler(10),
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={scaler(25)} color="#FFFFFF" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{text1 ?? _.capitalize(type)}</Text>
        {text2 && <Text style={styles.message}>{text2}</Text>}
      </View>

      {/* <TouchableOpacity onPress={hide} style={styles.closeButton}>
        <Icon name="times" size={scaler(16)} color="rgba(255,255,255,0.8)" />
      </TouchableOpacity> */}
    </View>
  );
};

export const toastConfig: ToastConfig = {
  success: props => <ToastBanner {...props} />,
  error: props => <ToastBanner {...props} />,
  info: props => <ToastBanner {...props} />,
};

const styles = StyleSheet.create({
  baseBanner: {
    width: '100%',
    paddingBottom: scaler(15),
    paddingHorizontal: scaler(20),
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: scaler(-10),

    // Shadow / Elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },

  iconContainer: {
    marginRight: scaler(12),
    marginTop: scaler(2), // Align icon with Title text
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: StandardFonts['700'],
    fontSize: scaler(14),
    marginBottom: scaler(2),
  },
  message: {
    color: '#FFFFFF',
    fontFamily: StandardFonts['400'],
    fontSize: scaler(12),
    lineHeight: scaler(16),
  },
  closeButton: {
    marginLeft: scaler(10),
    padding: scaler(5),
    marginTop: scaler(-2),
  },
});
