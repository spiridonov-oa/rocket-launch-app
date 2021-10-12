import React, { createContext, useContext, useState, useEffect } from "react";
import { formatDate } from "../helpers/date";
import { fetchRocketLaunches } from "../services/rocketService";
import { LaunchesResponseI, LaunchInfoI, LaunchItemI } from "../types/launch.types";

let counter = 1;
const baseUrl = "https://ll.thespacedevs.com/2.2.0/launch/?format=json";

const serializeData = (data: LaunchInfoI): LaunchItemI => ({
  id: data?.id,
  name: data?.name,
  image: data?.image,
  status: data?.status?.abbrev, // Failure | Success
  wiki_url: data?.pad?.info_url || data?.pad?.wiki_url,
  startDate: formatDate(data?.window_start),
});

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

  const fetchLaunches = async (url: string) => {
    console.log("fetchLaunches counter", counter++, url);
    setLoading(true);
    const [data, err] = await fetchRocketLaunches(url);
    setLoading(false);

    if (data) {
      const { count, next, previous, results } = data;
      setResponse({ count, next, previous });

      if (results?.length) {
        const serializedData = results.map(serializeData);
        console.log(serializedData);
        setList([...list, ...serializedData]);
      }
    }
    if (err) {
      setError(err);
    }
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
  };
}
