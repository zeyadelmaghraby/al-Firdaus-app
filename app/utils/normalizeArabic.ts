const DIACRITICS_REGEX = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g;
const TATWEEL = /\u0640/g;

export function normalizeArabic(text: string) {
  return text.replace(DIACRITICS_REGEX, '').replace(TATWEEL, '').trim();
}
