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
          <View style={styles.firstRow}>
            <Text style={styles.title}>
              {data.name} - {data.country_code}
            </Text>
          </View>
          <View style={styles.bottomRow}>
            <Text style={styles.date}>{data.startDate}</Text>
            <Text
              style={[styles.status, { color: data.status === "Success" ? colorScheme.success : colorScheme.error }]}
            >
              {Status[data.status]}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.infoIcon}>
            {!!data.wiki_url && (
              <Ionicons name={"information-circle-outline"} size={20} color={colorScheme.fontPrimary} />
            )}
          </View>
          <TouchableOpacity style={styles.favorites} onPress={handleAddToFavorites}>
            <Ionicons name={isFavorite ? "bookmarks" : "bookmarks-outline"} size={20} color={colorScheme.primary} />
          </TouchableOpacity>
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
  status: { fontSize: 12, marginTop: 4, marginRight: 4 },
  date: { fontSize: 12, marginTop: 4, marginRight: 10 },
  infoIcon: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  favorites: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
  },
  firstRow: { flexDirection: "row", justifyContent: "space-between" },
  bottomRow: { flexDirection: "row", justifyContent: "flex-start" },
});
