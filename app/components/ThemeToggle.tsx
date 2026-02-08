import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';

const ThemeToggle: React.FC = () => {
  const { mode, colors, toggleTheme } = useTheme();
  const isDark = mode === 'dark';
  return (
    <Pressable style={[styles.button, { borderColor: colors.border }]} onPress={toggleTheme}>
      <Ionicons name={isDark ? 'moon' : 'sunny'} size={18} color={colors.accent} />
      <Text style={[styles.text, { color: colors.text }]}>{isDark ? 'الوضع الليلي' : 'الوضع النهاري'}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default ThemeToggle;
