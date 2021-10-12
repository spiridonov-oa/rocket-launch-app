import { LaunchInfoI, LaunchItemI } from "../types/launch.types";
import { formatDate } from "./date";

export const serializeData = (data: LaunchInfoI): LaunchItemI => ({
  id: data?.id,
  name: data?.name,
  image: data?.image,
  status: data?.status?.abbrev, // Failure | Success
  wiki_url: data?.pad?.info_url || data?.pad?.wiki_url,
  startDate: formatDate(data?.window_start),
  country_code: data?.pad?.location?.country_code,
});
