import React from "react";
import { Modal, View, Text } from "react-native";
import LaunchList from "../components/LaunchList/LaunchList";
import { useLaunchHook } from "../hooks/useLaunchHook";
import { colorScheme } from "../theme/colors";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { results, response, loading, error, fetchLaunches }: any = useLaunchHook();

  const threshold = 1;

  const loadMoreData = () => {
    if (response?.next && !loading && !error) {
      fetchLaunches(response.next);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!!error ? (
        <View style={{ alignItems: "center", margin: 20 }}>
          <Text style={{ color: colorScheme.error }}>Some error occurred:</Text>
          <Text style={{ color: colorScheme.error }}>{error?.message}</Text>
        </View>
      ) : (
        <LaunchList data={results} onEndReached={loadMoreData} onEndReachedThreshold={threshold} loading={loading} />
      )}
    </View>
  );
};

export default HomeScreen;
