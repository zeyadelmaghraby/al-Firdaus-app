import React, { useCallback, useMemo, useRef } from 'react';
import { FlatList, ListRenderItemInfo, SafeAreaView, StyleSheet, Text, View, ViewToken, Pressable } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import { getSurah, Ayah } from '../../services/quranService';
import { useApp } from '../../context/AppContext';
import ContinueFab from '../../components/ContinueFab';
import { useTheme } from '../../theme';

type Route = RouteProp<RootStackParamList, 'SurahView'>;

const SurahViewScreen: React.FC = () => {
  const { params } = useRoute<Route>();
  const { favorites, isFavorite, toggleFavorite, lastRead, setLastRead } = useApp();
  const { colors, fonts, reader } = useTheme();

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
    ({ item }: ListRenderItemInfo<Ayah>) => {
      const fav = isFavorite({ surah: params.surahNumber, ayah: item.numberInSurah });
      const highlighted = lastRead?.surah === params.surahNumber && lastRead.ayah === item.numberInSurah;
      return (
        <View style={[styles.ayahBlock, highlighted && { backgroundColor: colors.border }]}>
          <Text
            style={[
              styles.ayahText,
              {
                color: colors.text,
                fontFamily: fonts.primary,
                fontSize: reader.fontSize,
                lineHeight: reader.lineHeight,
                writingDirection: 'rtl',
              },
            ]}
            selectable={false}
          >
            {item.text}{' '}
            <Text style={[styles.badge, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}>
              {item.numberInSurah}
            </Text>
          </Text>
          <Pressable
            hitSlop={10}
            onPress={() => toggleFavorite({ surah: params.surahNumber, ayah: item.numberInSurah })}
            style={styles.favButton}
          >
            <Text style={{ color: fav ? colors.accent : colors.muted, fontFamily: fonts.primary }}>{fav ? '★' : '☆'}</Text>
          </Pressable>
        </View>
      );
    },
    [colors, fonts, isFavorite, lastRead, params.surahNumber, reader.fontSize, reader.lineHeight, toggleFavorite],
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
        <Text style={[styles.title, { color: colors.text, fontFamily: fonts.primaryBold }]}>{surah.name}</Text>
        <Text style={{ color: colors.muted, fontFamily: fonts.primary }}>{surah.ayahs.length} آيات</Text>
        <Pressable
          style={[styles.markButton, { borderColor: colors.border }]}
          onPress={() => setLastRead({ surah: surah.number, ayah: 1 })}
        >
          <Text style={{ color: colors.text, fontFamily: fonts.primary }}>تعيين كبداية</Text>
        </Pressable>
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
    gap: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'right',
  },
  list: {
    paddingBottom: 90,
  },
  ayahBlock: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'transparent',
    position: 'relative',
  },
  ayahText: {
    textAlign: 'right',
  },
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    overflow: 'hidden',
    fontSize: 12,
  },
  favButton: {
    position: 'absolute',
    left: 12,
    top: 12,
  },
  markButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default SurahViewScreen;
