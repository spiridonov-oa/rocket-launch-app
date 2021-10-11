import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProvideFavorite } from "./src/hooks/useFavoriteHook";
import { ProvideLaunch } from "./src/hooks/useLaunchHook";
import AppNavigation from "./src/Navigation/AppNavigation";
import { colorScheme } from "./src/theme/colors";

export default function App() {
  return (
    <ProvideLaunch>
      <ProvideFavorite>
        <View style={styles.container}>
          <StatusBar style="dark" />
          <AppNavigation></AppNavigation>
        </View>
      </ProvideFavorite>
    </ProvideLaunch>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme.background,
  },
});
