import React from "react";
import { View } from "react-native";
import LaunchList from "../components/LaunchList/LaunchList";
import { useFavoriteHook } from "../hooks/useFavoriteHook";
import { LaunchItemI } from "../types/launch.types";

const FavoriteScreen = () => {
  const { favorites }: any = useFavoriteHook();

  const favoritesArray: LaunchItemI[] = Array.from(favorites.values());

  return (
    <View style={{ flex: 1 }}>
      <LaunchList data={favoritesArray} />
    </View>
  );
};

export default FavoriteScreen;
