import quranData from '../data/quran.json';
import { normalizeArabic } from '../utils/normalizeArabic';

export interface Ayah {
  number: number;
  numberInSurah: number;
  juz?: number;
  page?: number;
  hizbQuarter?: number;
  text: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName?: string;
  englishNameTranslation?: string;
  revelationType?: string;
  ayahs: Ayah[];
}

export interface SurahMeta {
  number: number;
  name: string;
  ayahCount: number;
  revelationType?: string;
  pageStart?: number;
}

export interface SearchResult {
  surah: number;
  ayah: number;
  text: string;
}

const surahs: Surah[] = (quranData as any).surahs || [];

export function getSurahList(): SurahMeta[] {
  return surahs.map((s) => ({
    number: s.number,
    name: s.name,
    ayahCount: s.ayahs.length,
    revelationType: s.revelationType,
    pageStart: s.ayahs[0]?.page,
  }));
}

export function getSurah(surahNumber: number): Surah | undefined {
  return surahs.find((s) => s.number === surahNumber);
}

export function search(query: string, limit = 30): SearchResult[] {
  if (!query) return [];
  const normalizedQuery = normalizeArabic(query);
  const results: SearchResult[] = [];
  for (const surah of surahs) {
    for (const ayah of surah.ayahs) {
      const normalizedAyah = normalizeArabic(ayah.text);
      if (normalizedAyah.includes(normalizedQuery)) {
        results.push({ surah: surah.number, ayah: ayah.numberInSurah, text: ayah.text });
        if (results.length >= limit) return results;
      }
    }
  }
  return results;
}
