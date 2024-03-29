import { ImageSourcePropType, ImageURISource } from "react-native";

export interface LaunchesResponseI {
  count: number;
  next: string | null;
  previous: string | null;
  results: LaunchInfoI[];
}

export interface LaunchInfoI {
  id: string;
  url: string;
  slug: string;
  name: string;
  status: {
    id: number;
    name: string;
    abbrev: "Success" | "Failure";
    description: string;
  };
  last_updated: string;
  net: string;
  window_end: string;
  window_start: string;
  probability: string | null;
  holdreason: string | null;
  failreason: string | null;
  hashtag: string | null;
  launch_service_provider: {
    id: number;
    url: string;
    name: string;
    type: string | null;
  };
  rocket: {
    id: number;
    configuration: {
      id: number;
      url: string;
      name: string;
      family: string;
      full_name: string;
      variant: string;
    };
  };
  mission: {
    id: number;
    name: string;
    description: string;
    launch_designator: string | null;
    type: string;
    orbit: {
      id: number;
      name: string;
      abbrev: string;
    };
  };
  pad: {
    id: number;
    url: string;
    agency_id: string | null;
    name: string;
    info_url: string | null;
    wiki_url: string | null;
    map_url: string;
    latitude: string;
    longitude: string;
    location: {
      id: number;
      url: string;
      name: string;
      country_code: string;
      map_image: string;
      total_launch_count: number;
      total_landing_count: number;
    };
    map_image: string;
    total_launch_count: number;
  };
  webcast_live: boolean;
  image: string | null;
  infographic: string | null;
  program: [
    {
      id: number;
      url: string | null;
      name: string | null;
      description: string | null;
      agencies: [
        {
          id: number;
          url: string | null;
          name: string | null;
          type: string | null;
        }
      ];
      image_url: string | null;
      start_date: string | null;
      end_date: string | null;
      info_url: string | null;
      wiki_url: string | null;
      mission_patches: [];
    }
  ];
}

export interface LaunchItemI {
  id: string;
  name: string | null;
  image: string | null;
  status: "Failure" | "Success"; // Failure | Success
  wiki_url: string | null;
  country_code: string | null;
  startDate: string | null;
}
