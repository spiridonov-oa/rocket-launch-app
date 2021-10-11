import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LaunchInfoI } from "../../types/launch.type";

const LaunchInfo = ({ data, onPress }: { data: LaunchInfoI; onPress: (e: string) => void }) => {
  const info = {
    id: data?.id,
    name: data?.name,
    image: data?.image,
    status: data?.status?.abbrev, // Failure | Success
    wiki_url: data?.pad?.info_url || data?.pad?.wiki_url,
    startDate: data?.window_start,
  };

  const onPressHandler = () => {
    if (info.wiki_url) {
      onPress(info.wiki_url);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={onPressHandler}>
        <Text>{info.name}</Text>
        {/* <Text>{info.image}</Text>
        <Text>{info.status}</Text> */}
        <Text>{info.wiki_url}</Text>
        <Text>{info.startDate}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LaunchInfo;

const styles = StyleSheet.create({
  container: {},
});
