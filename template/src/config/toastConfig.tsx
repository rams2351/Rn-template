import { Text } from '@/components/Text';
import { Colors } from '@/theme/Colors';
import { StandardFonts } from '@/theme/Fonts';
import { scaler } from '@/utils/helpers';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';

export const toastConfig: ToastConfig = {
  success: ({ text1, text2, hide }) => (
    <View style={[styles.baseBanner, styles.successBackground]}>
      <View style={styles.iconContainer}>
        <Icon name="check-circle" size={scaler(25)} color="#FFFFFF" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{text1 ?? 'Success'}</Text>
        <Text style={styles.message}>{text2}</Text>
      </View>
      <CloseButton hide={hide} />
    </View>
  ),

  error: ({ text1, text2, hide }) => (
    <View style={[styles.baseBanner, styles.errorBackground]}>
      <View style={styles.iconContainer}>
        <Icon name="exclamation-circle" size={scaler(25)} color="#FFFFFF" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{text1 ?? 'Error'}</Text>
        <Text style={styles.message}>{text2}</Text>
      </View>
      <CloseButton hide={hide} />
    </View>
  ),

  info: ({ text1, text2, hide }) => (
    <View style={[styles.baseBanner, styles.infoBackground]}>
      <View style={styles.iconContainer}>
        <Icon name="info-circle" size={scaler(25)} color="#FFFFFF" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{text1 ?? 'Info'}</Text>
        <Text style={styles.message}>{text2}</Text>
      </View>
      <CloseButton hide={hide} />
    </View>
  ),
};

const CloseButton: React.FC<{ hide: () => void }> = ({ hide }) => {
  return null;
  return (
    <TouchableOpacity onPress={() => hide()} style={styles.closeButton}>
      <Icon name="times" size={scaler(16)} color="rgba(255,255,255,0.6)" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseBanner: {
    // 1. Safety Buffer
    // It is often safer to keep vertical status-bar buffers unscaled or fixed,
    // but scaler() is acceptable if your testing shows it works.
    paddingTop: Platform.select({
      ios: scaler(120), // Keep huge buffer for iOS bounce
      android: scaler(60), // Standard padding for Android
    }),
    marginTop: Platform.select({
      ios: scaler(-60), // Pull up only on iOS
      android: scaler(-5), // No negative margin needed on Android
    }),

    width: '100%',
    paddingBottom: scaler(20),
    paddingHorizontal: scaler(20),
    flexDirection: 'row',
    // alignItems: 'center',
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  successBackground: { backgroundColor: Colors.light.success },
  errorBackground: { backgroundColor: Colors.light.destructive },
  infoBackground: { backgroundColor: Colors.light.info },

  iconContainer: { marginRight: scaler(13) },
  textContainer: { flex: 1 },
  title: {
    color: '#FFFFFF',
    fontFamily: StandardFonts['700'],
    fontSize: scaler(14),
    marginBottom: scaler(4),
  },
  message: {
    color: '#FFFFFF',
    fontFamily: StandardFonts['400'],
    fontSize: scaler(11),
    lineHeight: scaler(18),
    opacity: 0.9, // ✅ FIXED: Do not scale opacity
  },
  closeButton: { marginLeft: scaler(8), padding: scaler(3) },
});
