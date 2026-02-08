import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import SearchBar from '../../components/SearchBar';
import { search, SearchResult } from '../../services/quranService';
import { useTheme } from '../../theme';
import EmptyState from '../../components/EmptyState';

const SearchScreen: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();

  React.useEffect(() => {
    const timer = setTimeout(() => setResults(search(query)), 180);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.searchWrapper}>
        <SearchBar value={query} onChange={setQuery} placeholder="ابحث في الآيات" />
      </View>
      {results.length === 0 && query.length > 1 ? (
        <EmptyState message="لا توجد نتائج مطابقة" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, idx) => `${item.surah}-${item.ayah}-${idx}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.result, { borderBottomColor: colors.border }]}
              onPress={() => navigation.navigate('SurahView', { surahNumber: item.surah, ayahNumber: item.ayah })}
            >
              <Text style={[styles.resultText, { color: colors.text }]}>{item.text}</Text>
              <Text style={[styles.meta, { color: colors.muted }]}>
                سورة {item.surah} - آية {item.ayah}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchWrapper: { padding: 16 },
  result: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 6,
  },
  resultText: { fontSize: 16, textAlign: 'right' },
  meta: { fontSize: 12, textAlign: 'right' },
});

export default SearchScreen;
