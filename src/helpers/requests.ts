import { LaunchInfoI, LaunchItemI } from "../types/launch.types";
import { formatDate } from "./date";

export function serializeData(data: LaunchInfoI): LaunchItemI {
  return {
    id: data?.id,
    name: data?.name,
    image: data?.image,
    status: data?.status?.abbrev, // Failure | Success
    wiki_url: data?.pad?.info_url || data?.pad?.wiki_url,
    startDate: formatDate(data?.window_start),
    country_code: data?.pad?.location?.country_code,
  };
}

export function initDebounce() {
  let timer: NodeJS.Timeout;

  return (f: any, ms: number = 0) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      f();
    }, ms);
  };
}

export function avoidDuplicates(arr: LaunchItemI[]): LaunchItemI[] {
  const dataMap = arr.reduce((result: any, item) => {
    result.push([item.id, item]);
    return result;
  }, []);
  return Array.from(new Map<string, LaunchItemI>(dataMap).values());
}

export function getParams(url_string: string | undefined, param: string): string | null {
  if (!url_string) return null;
  return getQueryParams(url_string)[param];
}

export function getQueryParams(url: string) {
  const initParams = {
    limit: "10",
    offset: "0",
  };
  const obj = url
    .split("?")[1]
    .split("&")
    .reduce((result: any, substr) => {
      const arr = substr.split("=");
      result[arr[0]] = arr[1];
      return result;
    }, initParams);
  return obj;
}
