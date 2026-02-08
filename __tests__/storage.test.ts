import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bookmark, getFavorites, saveFavorites, getLastRead, saveLastRead, clearAll } from '../app/services/storage';

describe('storage helpers', () => {
  const favs: Bookmark[] = [
    { surah: 1, ayah: 1 },
    { surah: 2, ayah: 5 },
  ];

  beforeEach(async () => {
    await clearAll();
  });

  it('saves and loads favorites', async () => {
    await saveFavorites(favs);
    const loaded = await getFavorites();
    expect(loaded).toEqual(favs);
  });

  it('saves and loads lastRead', async () => {
    const last = { surah: 3, ayah: 10 };
    await saveLastRead(last);
    const loaded = await getLastRead();
    expect(loaded).toEqual(last);
  });

  it('clearAll wipes data', async () => {
    await saveFavorites(favs);
    await saveLastRead({ surah: 1, ayah: 2 });
    await clearAll();
    expect(await getFavorites()).toEqual([]);
    expect(await getLastRead()).toBeNull();
  });
});
