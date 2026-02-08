import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { DarkTheme, DefaultTheme, Theme as NavTheme } from '@react-navigation/native';
import { darkColors, lightColors } from './colors';

type ThemeMode = 'light' | 'dark';

interface ThemeValue {
  mode: ThemeMode;
  colors: typeof lightColors;
  navigationTheme: NavTheme;
  toggleTheme: () => void;
  fonts: {
    primary: string;
    primaryBold: string;
  };
  reader: {
    fontSize: number;
    lineHeight: number;
    increase: () => void;
    decrease: () => void;
  };
}

const ThemeContext = createContext<ThemeValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = (Appearance.getColorScheme() as ThemeMode) || 'light';
  const [mode, setMode] = useState<ThemeMode>(systemScheme);
  const [fontSize, setFontSize] = useState(20);
  const [lineHeight, setLineHeight] = useState(32);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo<ThemeValue>(() => {
    const isDark = mode === 'dark';
    const colors = isDark ? darkColors : lightColors;
    const navigationTheme = isDark
      ? {
          ...DarkTheme,
          colors: { ...DarkTheme.colors, background: colors.background, card: colors.card, text: colors.text },
        }
      : {
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, background: colors.background, card: colors.card, text: colors.text },
        };
    return {
      mode,
      colors,
      navigationTheme,
      toggleTheme,
      fonts: {
        primary: 'NotoSansArabic_400Regular',
        primaryBold: 'NotoSansArabic_700Bold',
      },
      reader: {
        fontSize,
        lineHeight,
        increase: () => setFontSize((s) => Math.min(s + 2, 26)),
        decrease: () => setFontSize((s) => Math.max(s - 2, 18)),
      },
    };
  }, [mode, fontSize, lineHeight]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
};
