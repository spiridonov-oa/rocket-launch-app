import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { StyleSheet } from "react-native";
import Tabs from "./Tabs";

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default AppNavigation;

// const styles = StyleSheet.create({
//   header: {
//     flex: 1,
//     backgroundColor: "#f4511e",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
