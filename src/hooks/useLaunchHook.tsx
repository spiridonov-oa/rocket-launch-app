import React, { createContext, useContext, useState, useEffect } from "react";
import { serializeData } from "../helpers/serialize";
import { fetchRocketLaunches } from "../services/rocketService";
import { LaunchesResponseI, LaunchItemI } from "../types/launch.types";

const baseUrl = "https://ll.thespacedevs.com/2.2.0/launch/?format=json";
const searchUrl = "https://ll.thespacedevs.com/2.2.0/launch/?format=json&search=";

const avoidDuplicates = (arr: LaunchItemI[]): LaunchItemI[] => {
  const dataMap = arr.reduce((result: any, item) => {
    result.push([item.id, item]);
    return result;
  }, []);
  return Array.from(new Map<string, LaunchItemI>(dataMap).values());
};

const LaunchContext = createContext(undefined);

// Provider component that wraps your app and makes Launch object ...
// ... available to any child component that calls useAuth().
export function ProvideLaunch({ children }: any) {
  const provider: any = useProvideLaunch();

  return <LaunchContext.Provider value={provider}>{children}</LaunchContext.Provider>;
}

export const useLaunchHook = () => useContext(LaunchContext);

function useProvideLaunch() {
  const [list, setList] = useState<LaunchItemI[]>([]);
  const [response, setResponse] = useState<Omit<LaunchesResponseI, "results">>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  const handleResponse = ([data, err]: any) => {
    if (err) {
      setError(err);
    } else if (data) {
      const { count, next, previous, results } = data;
      setResponse({ count, next, previous });

      if (results?.length) {
        const serializedData = results.map(serializeData);
        const clearList = avoidDuplicates([...list, ...serializedData]);
        // console.log(clearList.map((i) => i.id));
        setList(clearList);
      }
    } else {
      setError(new Error("Can not get data from response"));
    }
  };

  const fetchLaunches = async (url: string) => {
    setLoading(true);
    const [data, err] = await fetchRocketLaunches(url);
    setLoading(false);

    handleResponse([data, err]);
  };

  const searchLaunches = async (query: string, url: string) => {
    let nextPageUrl;
    if (!url) {
      if (!query) {
        fetchLaunches(baseUrl);
        return;
      } else if (query.length < 3) {
        return;
      }

      nextPageUrl = searchUrl + query;
      setList([]);
    } else {
      nextPageUrl = url;
    }
    setLoading(true);
    const [data, err] = await fetchRocketLaunches(nextPageUrl);
    setLoading(false);

    handleResponse([data, err]);
  };

  useEffect(() => {
    fetchLaunches(baseUrl);
  }, []);

  return {
    results: list,
    response,
    loading,
    error,
    fetchLaunches,
    searchLaunches,
  };
}
