import React from "react";
import { Modal, View, Text } from "react-native";
import LaunchList from "../components/LaunchList/LaunchList";
import { useLaunchHook } from "../hooks/useLaunchHook";
import { colorScheme } from "../theme/colors";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { results, response, loading, error, fetchLaunches }: any = useLaunchHook();

  console.log("error", error.message);

  return (
    <View style={{ flex: 1 }}>
      {!!error ? (
        <View style={{ alignItems: "center", margin: 20 }}>
          <Text style={{ color: colorScheme.error }}>Some Error occures:</Text>
          <Text style={{ color: colorScheme.error }}>{error?.message}</Text>
        </View>
      ) : (
        <LaunchList
          data={results}
          onEndReached={() => {
            if (response?.next && !loading && !error) {
              fetchLaunches(response.next);
            }
          }}
          loading={loading}
        />
      )}
    </View>
  );
};

export default HomeScreen;
