import React, { createContext, useContext, useState, useEffect } from "react";
import { getParams, initDebounce, serializeData } from "../helpers/requests";
import { baseUrl } from "../services/api";
import { fetchRocketLaunches } from "../services/rocketLaunchService";
import { LaunchesResponseI, LaunchItemI } from "../types/launch.types";

const searchUrl = baseUrl + "&search=";
const debounce = initDebounce();
let searchRequestId = 0;
let requestId = 0;

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
  const [response, setResponse] = useState<(LaunchesResponseI & { url?: string; requestId?: number }) | null>();
  const [responseSearch, setResponseSearch] = useState<
    (LaunchesResponseI & { url?: string; requestId?: number }) | null
  >();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mockData, setMockData] = useState<boolean>(false);

  const toggleMockData = (value: boolean) => {
    setMockData(value);
    clearLists();
  };

  const handleResponse = ([data, err]: any, url: string, requestId?: number) => {
    if (data) {
      if (getParams(url, "search")) {
        setResponseSearch({ ...data, url, requestId });
      } else {
        setResponse({ ...data, url, requestId });
      }
    } else {
      setError(err || new Error("Can not get data from response"));
      clearLists();
    }
  };

  const fetchLaunches = async (url: string) => {
    !!error && setError(null);
    setLoading(true);
    const saveId = requestId;
    const [data, err] = await fetchRocketLaunches(url, mockData);

    if (saveId === requestId) {
      handleResponse([data, err], url, saveId);
      setLoading(false);
    }
  };

  const fetchSearch = async (url: string) => {
    !!error && setError(null);
    setLoading(true);
    const saveId = searchRequestId;
    if (searchQuery !== getParams(url, "search")) {
      console.log(searchQuery, getParams(url, "search"));
      return;
    }
    const [data, err] = await fetchRocketLaunches(url, mockData);

    if (saveId === searchRequestId) {
      handleResponse([data, err], url, saveId);
      setLoading(false);
    }
  };

  const loadNextPage = async () => {
    const res = searchQuery ? responseSearch : response;
    if (res?.next && !loading && !error && res.count > list.length) {
      searchQuery ? fetchSearch(res.next) : fetchLaunches(res.next);
    }
  };

  const initFetch = () => {
    requestId = requestId + 1;
    clearLists();
    !!error && setError(null);
    fetchLaunches(baseUrl);
  };

  const clearLists = () => {
    setList([]);
    setSearchList([]);
    setResponse(null);
    setResponseSearch(null);
  };

  const initSearch = () => {
    if (searchQuery && searchQuery.length > 2) {
      debounce(() => {
        searchRequestId = searchRequestId + 1;
        setSearchList([]);
        fetchSearch(searchUrl + searchQuery);
      }, 500);
    } else {
      setSearchList([]);
      debounce(() => {});
    }
  };

  useEffect(() => {
    if (responseSearch?.results?.length) {
      const url = responseSearch?.url;
      const serializedData = responseSearch?.results.map(serializeData);
      // console.log("responseSearch.url", url);
      // console.log(getParams(url, "offset"), searchQuery, getParams(url, "search"));
      // console.log("searchRequestId", searchRequestId, responseSearch?.requestId);

      if (getParams(url, "search")) {
        if (searchQuery === getParams(url, "search") && searchRequestId === responseSearch?.requestId) {
          if (getParams(url, "offset")) {
            setSearchList([...searchList, ...serializedData]);
          } else {
            setSearchList(serializedData);
          }
        }
      }
    }
  }, [responseSearch]);

  useEffect(() => {
    if (response?.results?.length) {
      const serializedData = response?.results.map(serializeData);
      if (getParams(response?.url, "offset")) {
        setList([...list, ...serializedData]);
      } else {
        setList(serializedData);
      }
    }
  }, [response]);

  useEffect(() => {
    initSearch();
  }, [searchQuery, mockData]);

  useEffect(() => {
    initFetch();
  }, [mockData]);

  return {
    list,
    searchList,
    loading,
    error,
    searchQuery,
    mockData,
    loadNextPage,
    setSearchQuery,
    initFetch,
    initSearch,
    toggleMockData,
  };
}
