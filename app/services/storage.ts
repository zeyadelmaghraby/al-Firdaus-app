import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';
const LAST_READ_KEY = 'last_read';

export interface Bookmark {
  surah: number;
  ayah: number;
}

export async function getFavorites(): Promise<Bookmark[]> {
  const raw = await AsyncStorage.getItem(FAVORITES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveFavorites(favorites: Bookmark[]) {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export async function getLastRead(): Promise<Bookmark | null> {
  const raw = await AsyncStorage.getItem(LAST_READ_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function saveLastRead(lastRead: Bookmark) {
  await AsyncStorage.setItem(LAST_READ_KEY, JSON.stringify(lastRead));
}
