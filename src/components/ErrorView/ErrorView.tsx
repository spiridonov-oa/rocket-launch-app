import { Ionicons } from "@expo/vector-icons";
import React, { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colorScheme } from "../../theme/colors";

const ErrorView = ({ message = "", children }: { message: string; children: ReactElement }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={70} color={colorScheme.error} style={{ marginBottom: 30 }} />
      <Text style={{ color: colorScheme.error }}>Some error occurred:</Text>
      <Text style={{ color: colorScheme.error }}>{message}</Text>
      {children}
    </View>
  );
};

export default React.memo(ErrorView);

const styles = StyleSheet.create({
  container: { alignItems: "center", margin: 20 },
});
