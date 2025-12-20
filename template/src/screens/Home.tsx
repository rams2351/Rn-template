import { Text } from '@/components/Text';
import { useTheme } from '@/theme/ThemeProvider';
import { scaler, showInfoMsg } from '@/utils/helpers';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { toggleTheme, colors } = useTheme();

  const showSuccess = () => {
    Toast.show({
      type: 'success',
      text2: 'Your order #12345 has been successfully placed.',
    });
  };

  const showError = () => {
    Toast.show({
      type: 'error',
      text2: 'Could not connect to the server. Please try again.',
    });
  };

  const showInfo = () => {
    showInfoMsg('A new version of the app is ready for download.');
  };

  return (
    // 🚀 FIX: Auto-handle Top/Left/Right. Ignore Bottom (Tabs handle it).
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Area */}
        <MyComponent />

        <View style={styles.spacer} />

        {/* Buttons */}
        <Text style={styles.sectionTitle}>Test Toasts</Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#2E7D32' }]}
          onPress={showSuccess}
        >
          <Icon name="check" size={16} color="white" style={styles.btnIcon} />
          <Text style={styles.btnText}>Show Success Banner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#D32F2F' }]}
          onPress={showError}
        >
          <Icon name="warning" size={16} color="white" style={styles.btnIcon} />
          <Text style={styles.btnText}>Show Error Banner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#0288D1' }]}
          onPress={showInfo}
        >
          <Icon name="info" size={16} color="white" style={styles.btnIcon} />
          <Text style={styles.btnText}>Show Info Banner</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('KeyboardAnimation' as never)}
        >
          <Icon name="keyboard-o" size={40} color={colors.primary} />
          <Text style={{ marginTop: 5 }}>Go to Keyboard</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.foreground }]}
          onPress={toggleTheme}
        >
          <Text style={[styles.btnText, { color: colors.background }]}>
            Toggle Theme
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const MyComponent = () => (
  <Text style={styles.customFont}>Toast & Theme Demo</Text>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    // 🚀 FIX: Removed 'paddingTop: 60'.
    // SafeAreaView now adds the exact Notch height automatically.
    // We just add a small 20px buffer for aesthetics.
    paddingTop: 20,
  },
  spacer: {
    height: 30,
  },
  sectionTitle: {
    fontSize: scaler(16),
    fontWeight: '700',
    marginBottom: 15,
  },
  customFont: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  btnText: {
    color: 'white',
    fontSize: scaler(14),
    fontWeight: '600',
  },
  btnIcon: {
    marginRight: 10,
  },
  iconButton: {
    alignItems: 'center',
    padding: 10,
  },
});
