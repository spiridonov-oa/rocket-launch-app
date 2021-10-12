import { AsyncStorage } from "react-native";

export const storeData = async (name: string, data: any) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(data));
  } catch (error) {
    console.error("storeData", error);
  }
};

export const retrieveData = async (name: string) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error("retrieveData", error);
  }
};
