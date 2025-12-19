import { toastConfig } from '@/config/toastConfig';
import { AppNavigator } from '@/navigation/AppNavigator';
import { ThemeProvider, useTheme } from '@/theme/ThemeProvider';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <ThemeProvider>
      <AppRenderer />
    </ThemeProvider>
  );
}

const AppRenderer: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent={false}
      />
      <GestureHandlerRootView>
        <KeyboardProvider>
          <AppNavigator />
          <Toast
            config={toastConfig}
            position="top"
            topOffset={0} // Adjust this based on your StatusBar height
          />
        </KeyboardProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};
