import * as React from "react";
import LaunchDetailsScreen from "../screens/LaunchDetailsScreen";
import { ScreenNamesEnum } from "../screens/screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";

const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreenNamesEnum.HOME} component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name={ScreenNamesEnum.LAUNCH_INFO} component={LaunchDetailsScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
