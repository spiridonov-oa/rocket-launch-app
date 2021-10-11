import React from "react";
import { View, FlatList } from "react-native";
import LaunchInfo from "../components/LaunchInfo/LaunchInfo";
import { useFavoriteHook } from "../hooks/useFavoriteHook";
import { LaunchInfoI, LaunchItemI } from "../types/launch.types";
import { ScreenNamesEnum } from "./screens";

const FavoriteScreen = ({ navigation }: any) => {
  const { favorites, removeFavorite, saveFavorite }: any = useFavoriteHook();

  const favoritesArray: LaunchItemI[] = Array.from(favorites.values());

  const handlePressLaunchInfo = (uri: string) => {
    navigation.navigate(ScreenNamesEnum.LAUNCH_INFO, { params: { uri } });
  };

  const handlePressFavorites = (data: LaunchItemI) => {
    const isFavorite = favorites.has(data.id);
    if (isFavorite) {
      removeFavorite(data.id);
    } else {
      saveFavorite(data);
    }
  };

  const renderItem = ({ item }: { item: LaunchItemI }) => (
    <LaunchInfo
      key={item.id}
      data={item}
      isFavorite={favorites.has(item.id)}
      onPressInfo={handlePressLaunchInfo}
      onPressFavorites={handlePressFavorites}
    />
  );

  return (
    <View>
      <FlatList data={favoritesArray} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

export default FavoriteScreen;
