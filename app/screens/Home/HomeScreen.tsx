import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, Text, Pressable } from 'react-native';
import SurahCard from '../../components/SurahCard';
import { getSurahList, SurahMeta } from '../../services/quranService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { useTheme } from '../../theme';
import { useApp } from '../../context/AppContext';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors, fonts } = useTheme();
  const data = React.useMemo<SurahMeta[]>(() => getSurahList(), []);
  const { lastRead } = useApp();

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
        getItemLayout={(_, index) => ({ length: 78, offset: 78 * index, index })}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text, fontFamily: fonts.primaryBold }]}>الفهرس</Text>
            <Text style={{ color: colors.muted, fontFamily: fonts.primary }}>{data.length} سورة</Text>
            {lastRead && (
              <Pressable
                style={[styles.continueCard, { borderColor: colors.border, backgroundColor: colors.card }]}
                onPress={() => navigation.navigate('SurahView', { surahNumber: lastRead.surah, ayahNumber: lastRead.ayah })}
              >
                <Text style={{ color: colors.muted, fontFamily: fonts.primary, fontSize: 12 }}>متابعة القراءة</Text>
                <Text style={{ color: colors.text, fontFamily: fonts.primaryBold }}>
                  سورة {lastRead.surah}، آية {lastRead.ayah}
                </Text>
              </Pressable>
            )}
          </View>
        }
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
  header: {
    paddingBottom: 12,
    gap: 10,
  },
  title: { fontSize: 22, textAlign: 'right' },
  continueCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
});

export default HomeScreen;
