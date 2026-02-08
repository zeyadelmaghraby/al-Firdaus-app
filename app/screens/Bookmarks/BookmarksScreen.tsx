import React, { useMemo } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useApp } from '../../context/AppContext';
import { getSurah } from '../../services/quranService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { useTheme } from '../../theme';
import EmptyState from '../../components/EmptyState';
import { Ionicons } from '@expo/vector-icons';

interface GroupedBookmark {
  surah: number;
  surahName: string;
  items: { ayah: number }[];
}

const BookmarksScreen: React.FC = () => {
  const { favorites, toggleFavorite } = useApp();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors, fonts } = useTheme();

  const grouped = useMemo<GroupedBookmark[]>(() => {
    const map = new Map<number, GroupedBookmark>();
    favorites.forEach((fav) => {
      const surah = getSurah(fav.surah);
      const existing = map.get(fav.surah) || {
        surah: fav.surah,
        surahName: surah?.name || `سورة ${fav.surah}`,
        items: [],
      };
      existing.items.push({ ayah: fav.ayah });
      map.set(fav.surah, existing);
    });
    return Array.from(map.values());
  }, [favorites]);

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <EmptyState message="لا توجد مفضلات بعد. اضغط على النجمة لإضافة آية." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={grouped}
        keyExtractor={(item) => item.surah.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.title, { color: colors.text, fontFamily: fonts.primaryBold }]}>{item.surahName}</Text>
            {item.items.map((fav) => (
              <View key={fav.ayah} style={styles.row}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SurahView', { surahNumber: item.surah, ayahNumber: fav.ayah })}
                >
                  <Text style={{ color: colors.text, fontFamily: fonts.primary }}>آية {fav.ayah}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavorite({ surah: item.surah, ayah: fav.ayah })}>
                  <Ionicons name="trash-outline" size={18} color={colors.muted} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, gap: 12 },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  title: { fontSize: 18, fontWeight: '700', textAlign: 'right' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
});

export default BookmarksScreen;
