import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import LaunchInfo from "../components/LaunchInfo/LaunchInfo";
import { fetchRocketLaunches } from "../services/rocketAPI";
import { LaunchesResponseI, LaunchInfoI } from "../types/launch.type";
import { ScreenNamesEnum } from "./screens";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [list, setList] = useState<LaunchInfoI[]>([]);
  const [response, setResponse] = useState<Omit<LaunchesResponseI, "results">>();
  const baseUrl = "https://ll.thespacedevs.com/2.2.0/launch/?format=json";

  const fetchLaunches = async (url: string) => {
    const [data, error] = await fetchRocketLaunches(url);
    if (data) {
      const { count, next, previous, results } = data;
      setResponse({ count, next, previous });

      if (results?.length) {
        setList([...list, ...results]);
      }
    }
  };

  const onPressLaunchInfo = (uri: string) => {
    navigation.navigate(ScreenNamesEnum.LAUNCH_INFO, { params: { uri } });
  };

  const renderItem = ({ item }: { item: LaunchInfoI }) => (
    <LaunchInfo key={item.id} data={item} onPress={onPressLaunchInfo} />
  );

  useEffect(() => {
    fetchLaunches(baseUrl);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={list}
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
