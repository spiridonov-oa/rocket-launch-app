import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colorScheme } from "../../theme/colors";
import { LaunchInfoPropsI, Status } from "./LaunchInfo.types";

const Thumbnail = () => (
  <View style={[styles.image, { opacity: 0.2, backgroundColor: "#aaa" }]}>
    <Ionicons name={"ios-rocket-sharp"} size={20} color={"black"} />
  </View>
);

const LaunchInfo = ({ data, isFavorite, onPressInfo, onPressFavorites }: LaunchInfoPropsI) => {
  const handlePressInfo = () => {
    if (data.wiki_url) {
      onPressInfo(data.wiki_url);
    }
  };
  const handleAddToFavorites = () => {
    onPressFavorites(data);
  };

  return (
    <TouchableOpacity onPress={handlePressInfo}>
      <View style={styles.container}>
        {data.image ? (
          <Image style={styles.image} source={data.image ? { uri: data.image } : require("./rocket.png")} />
        ) : (
          <Thumbnail />
        )}

        <View style={styles.column}>
          <View style={styles.bottomRow}>
            {data.wiki_url ? (
              <Text style={styles.title}>
                {data.name} <Ionicons name={"information-circle-outline"} size={14} color={colorScheme.fontPrimary} />
              </Text>
            ) : (
              <Text style={styles.title}>{data.name}</Text>
            )}
            <TouchableOpacity onPress={handleAddToFavorites}>
              <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={20} color={colorScheme.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomRow}>
            <Text
              style={[styles.status, { color: data.status === "Success" ? colorScheme.success : colorScheme.error }]}
            >
              {Status[data.status]}
            </Text>
            <Text style={styles.date}>{data.startDate}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(LaunchInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    borderBottomColor: "rgba(0,0,0,0.05)",
    borderBottomWidth: 1,
    marginHorizontal: 5,
  },
  image: {
    width: 45,
    height: 45,
    margin: 5,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colorScheme.fontPrimary,
    fontWeight: "bold",
  },
  status: { fontSize: 12 },
  date: { fontSize: 10, marginTop: 4 },
  column: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
  },
  bottomRow: { flexDirection: "row", justifyContent: "space-between" },
});
