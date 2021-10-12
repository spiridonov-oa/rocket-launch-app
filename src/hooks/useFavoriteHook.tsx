import React, { createContext, useContext, useState, useEffect } from "react";
import { retrieveData, storeData } from "../services/asyncStorageService";
import { LaunchInfoI } from "../types/launch.types";

const FavoriteContext = createContext(undefined);

// Provider component that wraps your app and makes Favorite object ...
// ... available to any child component that calls useAuth().
export function ProvideFavorite({ children }: any) {
  const provider: any = useProvideFavorite();

  return <FavoriteContext.Provider value={provider}>{children}</FavoriteContext.Provider>;
}

export const useFavoriteHook = () => useContext(FavoriteContext);

function useProvideFavorite() {
  const name = "favorites";
  const [favorites, setFavorites] = useState<Map<string, LaunchInfoI>>(new Map());

  useEffect(() => {
    const loadFavorites = async () => {
      const favoritesArray = await retrieveData(name);
      if (Array.isArray(favoritesArray)) {
        setFavorites(new Map(favoritesArray.map((f) => [f.id, f])));
      }
    };
    loadFavorites();
  }, []);

  const saveFavorite = (item: LaunchInfoI) => {
    favorites.set(item.id, item);
    const newMap = new Map(favorites);
    setFavorites(newMap);
    storeData(name, Array.from(newMap));
  };

  const removeFavorite = (id: string) => {
    favorites.delete(id);
    const newMap = new Map(favorites);
    setFavorites(newMap);
    storeData(name, Array.from(newMap));
  };

  return {
    favorites,
    saveFavorite,
    removeFavorite,
  };
}