import React, { useCallback, useMemo, useRef } from 'react';
import { FlatList, ListRenderItemInfo, SafeAreaView, StyleSheet, Text, View, ViewToken } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import { getSurah, Ayah } from '../../services/quranService';
import AyahRow from '../../components/AyahRow';
import { useApp } from '../../context/AppContext';
import ContinueFab from '../../components/ContinueFab';
import { useTheme } from '../../theme';

type Route = RouteProp<RootStackParamList, 'SurahView'>;

const SurahViewScreen: React.FC = () => {
  const { params } = useRoute<Route>();
  const { favorites, isFavorite, toggleFavorite, lastRead, setLastRead } = useApp();
  const { colors } = useTheme();

  const surah = useMemo(() => getSurah(params.surahNumber), [params.surahNumber]);
  const listRef = useRef<FlatList<Ayah>>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const first = viewableItems.find((v) => v.isViewable && v.item);
      if (first?.item) {
        const ayah = first.item as Ayah;
        setLastRead({ surah: params.surahNumber, ayah: ayah.numberInSurah });
      }
    },
  ).current;

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 70 };

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Ayah>) => (
      <AyahRow
        ayah={item}
        surahNumber={params.surahNumber}
        isFavorite={isFavorite({ surah: params.surahNumber, ayah: item.numberInSurah })}
        onToggleFavorite={toggleFavorite}
        highlight={lastRead?.surah === params.surahNumber && lastRead.ayah === item.numberInSurah}
      />
    ),
    [params.surahNumber, isFavorite, toggleFavorite, lastRead],
  );

  if (!surah) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, padding: 16 }}>لم يتم العثور على السورة. تأكد من ملف البيانات.</Text>
      </SafeAreaView>
    );
  }

  const scrollToLastRead = () => {
    if (lastRead && lastRead.surah === params.surahNumber) {
      const index = surah.ayahs.findIndex((a) => a.numberInSurah === lastRead.ayah);
      if (index >= 0) {
        listRef.current?.scrollToIndex({ index, animated: true });
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>{surah.name}</Text>
        <Text style={{ color: colors.muted }}>{surah.ayahs.length} آيات</Text>
      </View>
      <FlatList
        ref={listRef}
        data={surah.ayahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({ length: 76, offset: 76 * index, index })}
        initialScrollIndex={
          params.ayahNumber
            ? Math.max(0, surah.ayahs.findIndex((a) => a.numberInSurah === params.ayahNumber))
            : undefined
        }
      />
      {lastRead?.surah === params.surahNumber && <ContinueFab onPress={scrollToLastRead} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'right',
  },
  list: {
    paddingBottom: 90,
  },
});

export default SurahViewScreen;
