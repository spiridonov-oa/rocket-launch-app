import React from "react";
import { FlatList, View } from "react-native";
import LaunchInfo from "../components/LaunchInfo/LaunchInfo";
import { useFavoriteHook } from "../hooks/useFavoriteHook";
import { useLaunchHook } from "../hooks/useLaunchHook";
import { LaunchItemI } from "../types/launch.types";
import { ScreenNamesEnum } from "./screens";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { favorites, removeFavorite, saveFavorite }: any = useFavoriteHook();
  const { results, response, loading, error, fetchLaunches }: any = useLaunchHook();

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

  console.log(results);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={() => {
          if (response?.next) fetchLaunches(response?.next);
        }}
      />
    </View>
  );
};

export default HomeScreen;
