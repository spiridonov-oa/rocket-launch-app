import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import LaunchInfo from "../components/LaunchInfo/LaunchInfo";
import { LaunchesResponseI, LaunchInfoI } from "../types/launch.type";
import { response1 } from "./exampleData";
import { ScreenNamesEnum } from "./screens";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [list, setList] = useState<LaunchInfoI[]>([]);
  const [response, setResponse] = useState<Omit<LaunchesResponseI, "results">>();
  const baseUrl = "https://ll.thespacedevs.com/2.2.0/launch/?format=json";

  const fetchLaunches = async (url: string) => {
    if (!url) return;
    try {
      // const response = await axios.get(url);
      const response = { data: response1 };
      if (!response?.data) {
        throw new Error("Can not get data from response");
      }
      const { count, next, previous, results } = response?.data as LaunchesResponseI;
      setResponse({ count, next, previous });
      console.log({ count, next, previous });

      if (results?.length) {
        setList([...list, ...results]);
      }
    } catch (error) {
      console.info(error);
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
