// src/theme/ThemeProvider.tsx
import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import { createMMKV } from 'react-native-mmkv';
import { Colors } from './Colors';

// 1. Initialize MMKV
const storage = createMMKV();

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  colors: typeof Colors.light;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 2. Load directly from storage (Synchronous!)
  const savedTheme = storage.getString('app_theme') as ThemeMode | undefined;
  const [theme, setThemeState] = useState<ThemeMode>(savedTheme ?? 'system');

  const systemColorScheme = useSystemColorScheme();

  const isDark = useMemo(() => {
    if (theme === 'system') {
      return systemColorScheme === 'dark';
    }
    return theme === 'dark';
  }, [theme, systemColorScheme]);

  const activeColors = useMemo(() => {
    return isDark ? Colors.dark : Colors.light;
  }, [isDark]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    storage.set('app_theme', mode);
  };

  const toggleTheme = () => {
    setTheme(theme == 'dark' ? 'light' : 'dark');
  };

  const value = useMemo(
    () => ({
      theme,
      isDark,
      colors: activeColors,
      setTheme,
      toggleTheme,
    }),
    [theme, isDark, activeColors],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
