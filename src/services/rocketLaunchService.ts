import axios from "axios";
import { mockData } from "../test/mockData";
import { LaunchesResponseI } from "../types/launch.types";

export const fetchRocketLaunches = async (
  url: string,
  shouldLoadMockData = false
): Promise<[LaunchesResponseI | null, Error | null]> => {
  try {
    if (!url) {
      throw new Error("URL should not be empty");
    }

    // console.log("---mock data", shouldLoadMockData);
    // console.log("load....... ", url);
    let response;
    if (shouldLoadMockData) {
      response = await mockData(url);
    } else {
      response = await axios.get(url);
    }

    if (!response?.data) {
      throw new Error("Can not get data from response");
    }

    return [response?.data as LaunchesResponseI, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};
