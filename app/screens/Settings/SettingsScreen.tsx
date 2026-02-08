import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ThemeToggle from '../../components/ThemeToggle';
import { useTheme } from '../../theme';
import { useApp } from '../../context/AppContext';

const SettingsScreen: React.FC = () => {
  const { colors } = useTheme();
  const { lastRead } = useApp();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.block}>
        <Text style={[styles.label, { color: colors.muted }]}>الوضع</Text>
        <ThemeToggle />
      </View>
      <View style={styles.block}>
        <Text style={[styles.label, { color: colors.muted }]}>آخر موضع قراءة</Text>
        <Text style={{ color: colors.text }}>
          {lastRead ? `سورة ${lastRead.surah} آية ${lastRead.ayah}` : 'لم يتم التعيين بعد'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 18 },
  block: {
    gap: 8,
  },
  label: { fontSize: 14 },
});

export default SettingsScreen;
