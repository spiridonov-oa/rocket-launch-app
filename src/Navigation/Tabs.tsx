import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import { ScreenNamesEnum } from "../screens/screens";
import { Ionicons } from "@expo/vector-icons";
import { colorScheme } from "../theme/colors";

const Tab = createBottomTabNavigator();

const menuIcons: any = {
  [ScreenNamesEnum.LIST]: "list",
  [ScreenNamesEnum.FAVORITES]: "heart",
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = menuIcons[route.name] || "";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colorScheme.primary,
        tabBarInactiveTintColor: colorScheme.fontPrimary,
      })}
    >
      <Tab.Screen name={ScreenNamesEnum.LIST} component={HomeScreen} />
      <Tab.Screen name={ScreenNamesEnum.FAVORITES} component={FavoriteScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;
