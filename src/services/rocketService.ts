import axios from "axios";
import { mockData } from "../screens/mockData";
import { LaunchesResponseI } from "../types/launch.types";

export const fetchRocketLaunches = async (url: string): Promise<[LaunchesResponseI | null, Error | null]> => {
  try {
    if (!url) {
      throw new Error("URL should not be empty");
    }
    // const response = await axios.get(url);
    console.log("fetching.............");
    const response = await mockData(url);

    if (!response?.data) {
      throw new Error("Can not get data from response");
    }

    console.log("response.data.results.length", response.data.results.length);

    return [response?.data as LaunchesResponseI, null];
  } catch (error) {
    console.info(error);
    return [null, error];
  }
};
