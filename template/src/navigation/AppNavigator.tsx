import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BootSplash from 'react-native-bootsplash';

// Screens
import { TestComponentsScreen } from '@/screens/ComponentsScreen';
import HomeScreen from '@/screens/Home';

// Theme
import { StandardFonts } from '@/theme/Fonts';
import { useTheme } from '@/theme/ThemeProvider';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: StandardFonts['700'],
          fontSize: 18,
          color: colors.foreground,
        },
        tabBarActiveTintColor: colors.border,
        tabBarInactiveTintColor: colors.foreground,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.primary,
          elevation: 0,
          // height: Platform.select({ android: 60, ios: 80 }),
        },
        tabBarIcon: ({ focused }) => (
          <Icon
            name="home"
            color={focused ? colors.border : colors.foreground}
          />
        ),
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="TestComponentsScreen"
        component={TestComponentsScreen}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { isDark, colors } = useTheme();
  const BaseTheme = isDark ? DarkTheme : DefaultTheme;

  const fontConfig = {
    regular: { fontFamily: StandardFonts['400'], fontWeight: '400' as const },
    medium: { fontFamily: StandardFonts['500'], fontWeight: '500' as const },
    bold: { fontFamily: StandardFonts['700'], fontWeight: '700' as const },
    heavy: { fontFamily: StandardFonts['800'], fontWeight: '800' as const },
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
    <NavigationContainer
      theme={navigationTheme}
      onReady={() => {
        // 🚀 EFFICIENCY TIP:
        // Hide the splash screen ONLY when navigation is fully mounted.
        // The "fade: true" creates a smooth, professional native feel.
        BootSplash.hide({ fade: true });
      }}
    >
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
