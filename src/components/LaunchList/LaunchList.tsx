import React from "react";
import { FlatList, View, ActivityIndicator, FlatListProps } from "react-native";
import { useFavoriteHook } from "../../hooks/useFavoriteHook";
import { colorScheme } from "../../theme/colors";
import { LaunchItemI } from "../../types/launch.types";
import EmptyList from "../EmptyList/EmptyList";
import LaunchInfo from "../LaunchInfo/LaunchInfo";
import { useNavigation } from "@react-navigation/native";
import { ScreenNamesEnum } from "../../screens/screens";

const LaunchList = ({
  loading = false,
  ...props
}: Omit<FlatListProps<LaunchItemI>, "renderItem"> & { loading?: boolean }) => {
  const { favorites, removeFavorite, saveFavorite }: any = useFavoriteHook();
  const navigation = useNavigation();

  const handlePressLaunchInfo = (uri: string) => {
    navigation.navigate(ScreenNamesEnum.LAUNCH_INFO as never, { params: { uri } } as never);
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
    <FlatList
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => <EmptyList />}
      ListFooterComponent={() =>
        loading ? (
          <View style={{ marginVertical: 20 }}>
            <ActivityIndicator size="large" color={colorScheme.primary} />
          </View>
        ) : null
      }
      {...props}
    />
  );
};

export default React.memo(LaunchList);
