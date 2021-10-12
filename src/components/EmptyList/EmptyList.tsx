import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { colorScheme } from "../../theme/colors";

const EmptyList = ({ text = "This list is empty", loading = false }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: "20%" }}>
      {loading ? (
        <ActivityIndicator size="large" color={colorScheme.primary} />
      ) : (
        <Text style={{ color: colorScheme.lightText, marginBottom: 17 }}>{text}</Text>
      )}
      <Ionicons name="rocket-outline" size={60} color={colorScheme.lightText} style={{ marginTop: "10%" }} />
    </View>
  );
};

export default React.memo(EmptyList);
