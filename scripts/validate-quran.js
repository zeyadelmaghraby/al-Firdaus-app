// Lightweight validator for bundled Quran data from quran-json
// Run: npm run validate:data
const data = require('quran-json/dist/quran.json');

function main() {
  if (!Array.isArray(data) || data.length !== 114) {
    throw new Error(`Expected 114 surahs, found ${data.length}`);
  }
  data.forEach((s, idx) => {
    if (s.id !== idx + 1) throw new Error(`Surah numbering mismatch at index ${idx}: got ${s.id}`);
    if (!s.name || !s.verses || s.verses.length !== s.total_verses) {
      throw new Error(`Surah ${s.id} missing name/verses or count mismatch`);
    }
    s.verses.forEach((v, i) => {
      if (v.id !== i + 1) throw new Error(`Ayah numbering mismatch in surah ${s.id} at index ${i}: ${v.id}`);
      if (!v.text || typeof v.text !== 'string') throw new Error(`Ayah text missing in surah ${s.id}, ayah ${v.id}`);
    });
  });
  console.log('Quran data OK: 114 surahs, all ayahs present');
}

main();
