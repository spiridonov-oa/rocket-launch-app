import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageProps } from "react-native";
import { colorScheme } from "../../theme/colors";
import { LaunchInfoI } from "../../types/launch.type";

enum Status {
  Failure = "Failed",
  Success = "Succeeded",
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US");
};

const Thumbnail = () => (
  <View style={[styles.image, { opacity: 0.2, backgroundColor: "#aaa" }]}>
    <Ionicons name={"ios-rocket-sharp"} size={20} color={"black"} />
  </View>
);

const LaunchInfo = ({ data, onPress }: { data: LaunchInfoI; onPress: (e: string) => void }) => {
  const info = {
    id: data?.id,
    name: data?.name,
    image: data?.image,
    status: data?.status?.abbrev, // Failure | Success
    wiki_url: data?.pad?.info_url || data?.pad?.wiki_url,
    startDate: formatDate(data?.window_start),
  };

  const onPressHandler = () => {
    if (info.wiki_url) {
      onPress(info.wiki_url);
    }
  };

  return (
    <View style={styles.container}>
      {info.image ? (
        <Image style={styles.image} source={info.image ? { uri: info.image } : require("./rocket.png")} />
      ) : (
        <Thumbnail />
      )}

      <View style={styles.column}>
        <View style={styles.bottomRow}>
          {info.wiki_url ? (
            <TouchableOpacity onPress={onPressHandler}>
              <Text style={styles.title}>
                {info.name} <Ionicons name={"information-circle-outline"} size={14} color={colorScheme.fontPrimary} />
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.title}>{info.name}</Text>
          )}
          <TouchableOpacity>
            <Ionicons name={"heart-outline"} size={20} color={colorScheme.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRow}>
          <Text style={[styles.status, { color: info.status === "Success" ? colorScheme.success : colorScheme.error }]}>
            {Status[info.status]}
          </Text>
          <Text style={styles.date}>{info.startDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default LaunchInfo;

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
