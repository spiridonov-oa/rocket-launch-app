import { LaunchItemI } from "../../types/launch.types";

export enum StatusLabels {
  Failure = "Failed",
  Success = "Succeeded",
}

export interface LaunchInfoPropsI {
  data: LaunchItemI;
  isFavorite: boolean;
  onPressInfo: (e: string) => void;
  onPressFavorites: (e: LaunchItemI) => void;
}
