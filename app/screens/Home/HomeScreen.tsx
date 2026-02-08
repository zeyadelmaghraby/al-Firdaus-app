import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import SurahCard from '../../components/SurahCard';
import { getSurahList, SurahMeta } from '../../services/quranService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { useTheme } from '../../theme';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const data = React.useMemo<SurahMeta[]>(() => getSurahList(), []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <SurahCard
            surah={item}
            onPress={() => navigation.navigate('SurahView', { surahNumber: item.number })}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
});

export default HomeScreen;
