import fullQuran from 'quran-json/dist/quran.json';
import { normalizeArabic } from '../utils/normalizeArabic';

export interface Ayah {
  number: number; // global number across mushaf (not provided by dataset, we synthesize)
  numberInSurah: number;
  text: string;
  page?: number;
  juz?: number;
}

export interface Surah {
  number: number;
  name: string;
  transliteration?: string;
  revelationType?: 'meccan' | 'medinan';
  ayahs: Ayah[];
}

export interface SurahMeta {
  number: number;
  name: string;
  ayahCount: number;
  revelationType?: string;
}

export interface SearchResult {
  surah: number;
  ayah: number;
  text: string;
}

// Normalize dataset from quran-json: [{ id, name, transliteration, type, total_verses, verses: [{id,text}, ...] }]
const surahs: Surah[] = (fullQuran as any[]).map((s) => ({
  number: s.id,
  name: s.name,
  transliteration: s.transliteration,
  revelationType: s.type,
  ayahs: s.verses.map((v: any) => ({
    number: v.id, // local within surah in dataset
    numberInSurah: v.id,
    text: v.text,
  })),
}));

export function getSurahList(): SurahMeta[] {
  return surahs.map((s) => ({
    number: s.number,
    name: s.name,
    ayahCount: s.ayahs.length,
    revelationType: s.revelationType,
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
