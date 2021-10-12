import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { colorScheme } from "../../theme/colors";

const EmptyList = ({ text = "This list is empty", loading = false }) => {
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colorScheme.primary} />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
      <Ionicons name="rocket-outline" size={100} color={colorScheme.placeholderText} style={{ marginTop: "10%" }} />
    </View>
  );
};

export default React.memo(EmptyList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
  },
  text: {
    fontSize: 20,
    color: colorScheme.placeholderText,
    textAlign: "center",
    marginBottom: 17,
  },
});
