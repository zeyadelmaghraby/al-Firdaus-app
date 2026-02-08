import { normalizeArabic } from '../app/utils/normalizeArabic';

describe('normalizeArabic', () => {
  it('strips diacritics and tatweel', () => {
    const input = 'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ';
    const normalized = normalizeArabic(input);
    expect(normalized).toBe('بسم الله الرحمن الرحيم');
  });

  it('handles empty strings', () => {
    expect(normalizeArabic('')).toBe('');
  });
});
