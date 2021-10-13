import React, { createContext, useContext, useState, useEffect } from "react";
import { getParams, initDebounce, serializeData } from "../helpers/requests";
import { baseUrl } from "../services/api";
import { fetchRocketLaunches } from "../services/rocketService";
import { LaunchesResponseI, LaunchItemI } from "../types/launch.types";

const searchUrl = baseUrl + "&search=";
const debounce = initDebounce();

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
  const [searchList, setSearchList] = useState<LaunchItemI[]>([]);
  const [response, setResponse] = useState<LaunchesResponseI & { url?: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mockData, setMockData] = useState<boolean>(true);

  const toggleMockData = (value: boolean) => {
    setMockData(value);
    clearLists();
  };

  const handleResponse = ([data, err]: any, url: string) => {
    if (err) {
      setError(err);
      clearLists();
    } else if (data) {
      const { count, next, previous, results } = data;
      setResponse({ count, next, previous, results, url });
    } else {
      setError(new Error("Can not get data from response"));
      clearLists();
    }
  };

  const fetchLaunches = async (url: string) => {
    !!error && setError(null);
    setLoading(true);
    const [data, err] = await fetchRocketLaunches(url, mockData);
    setLoading(false);

    handleResponse([data, err], url);
  };

  const initFetch = () => {
    clearLists();
    !!error && setError(null);
    fetchLaunches(baseUrl);
  };

  const clearLists = () => {
    setList([]);
    setSearchList([]);
  };

  useEffect(() => {
    if (response?.results?.length) {
      const url = response?.url;
      const serializedData = response?.results.map(serializeData);
      // console.log("response.url", url);
      // console.log(getParams(url, "offset"), searchQuery, getParams(url, "search"));

      if (getParams(url, "search")) {
        if (searchQuery === getParams(url, "search")) {
          const filteredResult = serializedData.filter((item) => item.name?.includes(searchQuery));
          if (getParams(url, "offset")) {
            setSearchList([...searchList, ...filteredResult]);
          } else {
            setSearchList(filteredResult);
          }
        }
      } else {
        setList([...list, ...serializedData]);
      }
    }
  }, [response]);

  useEffect(() => {
    setSearchList([]);
    if (searchQuery && searchQuery.length > 2) {
      debounce(() => {
        fetchLaunches(searchUrl + searchQuery);
      }, 500);
    } else {
      debounce(() => {});
    }
  }, [searchQuery, mockData]);

  useEffect(() => {
    initFetch();
  }, [mockData]);

  return {
    list: list,
    searchList: searchList,
    response,
    loading,
    error,
    searchQuery,
    mockData,
    fetchLaunches,
    setSearchQuery,
    initFetch,
    toggleMockData,
  };
}
