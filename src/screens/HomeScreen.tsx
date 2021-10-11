import axios from "axios";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import LaunchInfo from "../components/LaunchInfo/LaunchInfo";
import { LaunchesResponseI, LaunchInfoI } from "../types/launch.type";
import { ScreenNamesEnum } from "./screens";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [list, setList] = useState<LaunchInfoI[]>([]);

  useEffect(() => {
    const getLaunches = async () => {
      try {
        const response = await axios.get("https://ll.thespacedevs.com/2.2.0/launch/?format=json");
        const responseData: LaunchesResponseI = response.data;
        if (responseData?.results) {
          setList(responseData.results);
        }
      } catch (error) {
        console.info(error);
      }
    };

    getLaunches();
  }, []);

  const onPressLaunchInfo = (uri: string) => {
    navigation.navigate(ScreenNamesEnum.LAUNCH_INFO, { params: { uri } });
  };

  return (
    <View style={{ flex: 1 }}>
      {list.map((item) => (
        <LaunchInfo key={item.id} data={item} onPress={onPressLaunchInfo} />
      ))}
    </View>
  );
};

export default HomeScreen;
