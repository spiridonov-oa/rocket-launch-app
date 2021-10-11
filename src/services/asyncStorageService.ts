import { AsyncStorage } from "react-native";

export const storeData = async (name: string, data: any) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(data));
  } catch (error) {
    // Error saving data
  }
};

export const retrieveData = async (name: string) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      // Our data is fetched successfully
      console.log(value);
      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};
