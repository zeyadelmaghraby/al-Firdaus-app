import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SurahMeta } from '../services/quranService';
import { useTheme } from '../theme';

interface Props {
  surah: SurahMeta;
  onPress: () => void;
}

const SurahCard: React.FC<Props> = ({ surah, onPress }) => {
  const { colors } = useTheme();
  return (
    <Pressable style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={onPress}>
      <View>
        <Text style={[styles.name, { color: colors.text }]}>{surah.name}</Text>
        <Text style={[styles.meta, { color: colors.muted }]}>{surah.ayahCount} آيات</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'right',
  },
  meta: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'right',
  },
});

export default SurahCard;
