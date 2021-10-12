import React from "react";
import { View } from "react-native";
import LaunchList from "../components/LaunchList/LaunchList";
import { useLaunchHook } from "../hooks/useLaunchHook";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { results, response, loading, error, fetchLaunches }: any = useLaunchHook();

  return (
    <View style={{ flex: 1 }}>
      <LaunchList
        data={results}
        onEndReached={() => {
          if (response?.next) fetchLaunches(response?.next);
        }}
        loading={loading}
      />
    </View>
  );
};

export default HomeScreen;
