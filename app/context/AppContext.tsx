import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Bookmark, getFavorites, getLastRead, saveFavorites, saveLastRead, clearAll } from '../services/storage';

interface AppState {
  favorites: Bookmark[];
  lastRead: Bookmark | null;
  loading: boolean;
  toggleFavorite: (bookmark: Bookmark) => void;
  isFavorite: (bookmark: Bookmark) => boolean;
  setLastRead: (bookmark: Bookmark) => void;
  resetAll: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Bookmark[]>([]);
  const [lastRead, setLastReadState] = useState<Bookmark | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const favs = await getFavorites();
        const last = await getLastRead();
        setFavorites(favs);
        setLastReadState(last);
      } catch (e) {
        console.warn('Failed to load storage', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggleFavorite = (bookmark: Bookmark) => {
    setFavorites((prev) => {
      const exists = prev.some((b) => b.surah === bookmark.surah && b.ayah === bookmark.ayah);
      const updated = exists ? prev.filter((b) => !(b.surah === bookmark.surah && b.ayah === bookmark.ayah)) : [...prev, bookmark];
      saveFavorites(updated).catch(console.warn);
      return updated;
    });
  };

  const setLastRead = (bookmark: Bookmark) => {
    setLastReadState(bookmark);
    saveLastRead(bookmark).catch(console.warn);
  };

  const resetAll = async () => {
    try {
      await clearAll();
    } catch (e) {
      console.warn('Reset failed', e);
    } finally {
      setFavorites([]);
      setLastReadState(null);
    }
  };

  const value = useMemo<AppState>(
    () => ({
      favorites,
      lastRead,
      loading,
      toggleFavorite,
      isFavorite: (bookmark: Bookmark) => favorites.some((b) => b.surah === bookmark.surah && b.ayah === bookmark.ayah),
      setLastRead,
      resetAll,
    }),
    [favorites, lastRead, loading],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
};
