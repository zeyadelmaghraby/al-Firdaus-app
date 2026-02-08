import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SurahMeta } from '../services/quranService';
import { useTheme } from '../theme';

interface Props {
  surah: SurahMeta;
  onPress: () => void;
}

const SurahCard: React.FC<Props> = ({ surah, onPress }) => {
  const { colors, fonts } = useTheme();
  const typeLabel = surah.revelationType === 'medinan' ? 'مدنية' : 'مكية';
  return (
    <Pressable style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={onPress}>
      <View>
        <Text style={[styles.name, { color: colors.text, fontFamily: fonts.primaryBold }]}>{surah.name}</Text>
        <Text style={[styles.meta, { color: colors.muted, fontFamily: fonts.primary }]}>{surah.ayahCount} آيات</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: colors.border }]}>
        <Text style={{ color: colors.text, fontFamily: fonts.primary, fontSize: 12 }}>{typeLabel}</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    minWidth: 56,
    alignItems: 'center',
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
