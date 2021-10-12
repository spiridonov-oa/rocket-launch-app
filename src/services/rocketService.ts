import axios from "axios";
import { response1 } from "../screens/exampleData";
import { LaunchesResponseI } from "../types/launch.types";

export const fetchRocketLaunches = async (url: string): Promise<[LaunchesResponseI | null, Error | null]> => {
  try {
    if (!url) {
      throw new Error("URL should not be empty");
    }
    const response = await axios.get(url);
    // const response = { data: response1 };
    if (!response?.data) {
      throw new Error("Can not get data from response");
    }

    return [response?.data as LaunchesResponseI, null];
  } catch (error) {
    console.info(error);
    return [null, error];
  }
};