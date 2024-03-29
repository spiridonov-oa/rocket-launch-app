import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colorScheme } from "../../theme/colors";

const EmptyList = ({ text = "This list is empty", loading = false }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{!loading ? text : " "}</Text>
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
    margin: 20,
    marginTop: "20%",
  },
  text: {
    fontSize: 20,
    color: colorScheme.placeholderText,
    textAlign: "center",
    marginBottom: 17,
  },
});
