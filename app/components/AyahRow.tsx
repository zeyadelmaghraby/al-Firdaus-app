import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { Ayah } from '../services/quranService';
import { Bookmark } from '../services/storage';

interface Props {
  ayah: Ayah;
  surahNumber: number;
  isFavorite: boolean;
  onToggleFavorite: (bookmark: Bookmark) => void;
  onLongPress?: () => void;
  highlight?: boolean;
}

const AyahRow: React.FC<Props> = ({ ayah, surahNumber, isFavorite, onToggleFavorite, onLongPress, highlight }) => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        styles.row,
        { backgroundColor: highlight ? colors.border : colors.background, borderColor: colors.border },
      ]}
      onLongPress={onLongPress}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: colors.text }]} selectable={false}>
          {ayah.text}
        </Text>
        <Text style={[styles.meta, { color: colors.muted }]}>({ayah.numberInSurah})</Text>
      </View>
      <Pressable
        hitSlop={8}
        onPress={() => onToggleFavorite({ surah: surahNumber, ayah: ayah.numberInSurah })}
        style={styles.icon}
      >
        <Ionicons name={isFavorite ? 'bookmark' : 'bookmark-outline'} size={20} color={colors.accent} />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'right',
  },
  meta: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  icon: {
    padding: 6,
  },
});

export default AyahRow;
