import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
// Screens
import HomeScreen from '@/screens/Home';
import KeyboardAnimation from '@/screens/Keyboard';

// Theme
import { StandardFonts } from '@/theme/Fonts';
import { useTheme } from '@/theme/ThemeProvider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  // 1. Hook into the theme to get current colors
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: StandardFonts['700'],
          fontSize: 18,
          color: colors.foreground, // Dynamic Text Color
        },
        tabBarActiveTintColor: colors.primary, // Dynamic Brand Color
        tabBarInactiveTintColor: colors.mutedForeground, // Dynamic Grey
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.background, // Dynamic Background
          elevation: 0, // Removes Android Shadow for cleaner look
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={KeyboardAnimation} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { isDark, colors } = useTheme();
  const BaseTheme = isDark ? DarkTheme : DefaultTheme;

  const fontConfig = {
    regular: {
      fontFamily: StandardFonts['400'], // Fixed index to string '400'
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: StandardFonts['500'],
      fontWeight: '500' as const,
    },
    bold: {
      fontFamily: StandardFonts['700'],
      fontWeight: '700' as const,
    },
    heavy: {
      fontFamily: StandardFonts['800'],
      fontWeight: '800' as const,
    },
  };

  const navigationTheme: Theme = {
    ...BaseTheme,
    colors: {
      ...BaseTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.background,
      text: colors.foreground,
      border: colors.border,
      notification: colors.destructive,
    },
    fonts: fontConfig,
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="MainTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
