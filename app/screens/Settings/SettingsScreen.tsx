import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import ThemeToggle from '../../components/ThemeToggle';
import { useTheme } from '../../theme';
import { useApp } from '../../context/AppContext';

const SettingsScreen: React.FC = () => {
  const { colors, fonts } = useTheme();
  const { lastRead, resetAll } = useApp();
  const { reader } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.block}>
        <Text style={[styles.label, { color: colors.muted, fontFamily: fonts.primary }]}>الوضع</Text>
        <ThemeToggle />
      </View>
      <View style={styles.block}>
        <Text style={[styles.label, { color: colors.muted, fontFamily: fonts.primary }]}>آخر موضع قراءة</Text>
        <Text style={{ color: colors.text, fontFamily: fonts.primary }}>
          {lastRead ? `سورة ${lastRead.surah} آية ${lastRead.ayah}` : 'لم يتم التعيين بعد'}
        </Text>
      </View>
      <Pressable
        style={[styles.button, { borderColor: colors.border }]}
        onPress={() =>
          Alert.alert('تأكيد', 'سيتم مسح المفضلات وآخر موضع قراءة.', [
            { text: 'إلغاء', style: 'cancel' },
            { text: 'مسح', style: 'destructive', onPress: resetAll },
          ])
        }
      >
        <Text style={{ color: colors.text, fontFamily: fonts.primary }}>مسح البيانات المحفوظة</Text>
      </Pressable>
      <View style={styles.block}>
        <Text style={[styles.label, { color: colors.muted, fontFamily: fonts.primary }]}>حجم الخط في القراءة</Text>
        <View style={styles.row}>
          <Pressable style={[styles.pill, { borderColor: colors.border }]} onPress={reader.decrease}>
            <Text style={{ color: colors.text, fontFamily: fonts.primary }}>A-</Text>
          </Pressable>
          <Text style={{ color: colors.text, fontFamily: fonts.primary }}>{reader.fontSize}px</Text>
          <Pressable style={[styles.pill, { borderColor: colors.border }]} onPress={reader.increase}>
            <Text style={{ color: colors.text, fontFamily: fonts.primary }}>A+</Text>
          </Pressable>
        </View>
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
  button: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default SettingsScreen;
