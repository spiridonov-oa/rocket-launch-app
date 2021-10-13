import { LaunchesResponseI, LaunchInfoI } from "../types/launch.types";

const generateMockData = (url: string): { data: LaunchesResponseI } => {
  const params = getQueryParams(url);
  const num: number = params.offset ? +params.offset / +params.limit : 0;

  const randomBool = (): boolean => {
    return !Math.round(Math.random());
  };

  let results: LaunchInfoI[] = new Array(10).fill(0).map((v, i) => ({
    id: `id-${num}-${i}`,
    url: "https://ll.thespacedevs.com/2.2.0/launch/e3df2ecd-c239-472f-95e4-2b89b4f75800/?format=api",
    slug: `sputnik-${num}-${i}`,
    name: `Sputnik ${params.search || ""} --${num}--${i}` + (randomBool() ? "" : " The launch vehicle successfully"),
    status: {
      id: 3,
      name: "Launch Successful",
      abbrev: randomBool() ? "Success" : "Failure",
      description: "The launch vehicle successfully inserted its payload(s) into the target orbit(s).",
    },
    last_updated: "2021-08-31T20:43:53Z",
    net: "1957-10-04T19:28:34Z",
    window_end: "1957-10-04T19:28:34Z",
    window_start: `1957-0${i > 9 ? 9 : i}-04T19:28:34Z`,
    probability: null,
    holdreason: null,
    failreason: null,
    hashtag: null,
    launch_service_provider: {
      id: 66,
      url: "https://ll.thespacedevs.com/2.2.0/agencies/66/?format=api",
      name: "Soviet Space Program",
      type: "Government",
    },
    rocket: {
      id: 3003,
      configuration: {
        id: 468,
        url: "https://ll.thespacedevs.com/2.2.0/config/launcher/468/?format=api",
        name: "Sputnik 8K74PS",
        family: "Sputnik",
        full_name: "Sputnik 8K74PS",
        variant: "8K74PS",
      },
    },
    mission: {
      id: 1430,
      name: "Sputnik 1",
      description:
        "First artificial satellite consisting of a 58 cm pressurized aluminium shell containing two 1 W transmitters for a total mass of 83.6 kg.",
      launch_designator: null,
      type: "Test Flight",
      orbit: {
        id: 8,
        name: "Low Earth Orbit",
        abbrev: "LEO",
      },
    },
    pad: {
      id: 32,
      url: "https://ll.thespacedevs.com/2.2.0/pad/32/?format=api",
      agency_id: null,
      name: "1/5",
      info_url: randomBool()
        ? "https://en.wikipedia.org/wiki/Cape_Canaveral_Air_Force_Station_Launch_Complex_26"
        : null,
      wiki_url: randomBool()
        ? "https://en.wikipedia.org/wiki/Cape_Canaveral_Air_Force_Station_Launch_Complex_26"
        : null,
      map_url: "https://www.google.com/maps/place/45Â°55'12.0\"N+63Â°20'31.2\"E",
      latitude: "45.92",
      longitude: "63.342",
      location: {
        id: 15,
        url: "https://ll.thespacedevs.com/2.2.0/location/15/?format=api",
        name: "Baikonur Cosmodrome, Republic of Kazakhstan",
        country_code: randomBool() ? "US" : "KAZ",
        map_image:
          "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/location_15_20200803142517.jpg",
        total_launch_count: 1524,
        total_landing_count: 0,
      },
      map_image:
        "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/pad_32_20200803143513.jpg",
      total_launch_count: 487,
    },
    webcast_live: false,
    image: randomBool()
      ? "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/sputnik_8k74ps_image_20210830185541.jpg"
      : null,
    infographic: null,
    program: [],
  }));

  const nextUrl = getNextUrl(url);

  if (num > 100 || params?.search?.length > 7) {
    return { data: { count: params.search ? 100 : 1000, next: null, previous: url, results: [] } };
  } else {
    return { data: { count: params.search ? 100 : 1000, next: nextUrl, previous: url, results } };
  }
};

function getQueryParams(url: string) {
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

function getNextUrl(url: string) {
  const params = getQueryParams(url);
  params.offset = +params.offset + +params.limit;
  return (
    "https://ll.thespacedevs.com/2.2.0/launch/?" +
    Object.keys(params)
      .map((k) => `${k}=${params[k]}`)
      .join("&")
  );
}
// https://ll.thespacedevs.com/2.2.0/launch/?format=json
// https://ll.thespacedevs.com/2.2.0/launch/?format=json&limit=10&offset=20
// https://ll.thespacedevs.com/2.2.0/launch/?format=json&search=Falcooo
// https://ll.thespacedevs.com/2.2.0/launch/?format=json&limit=10&offset=20&search=Falc

export function mockData(url: string): Promise<{ data: LaunchesResponseI }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(generateMockData(url));
    }, 3000);
  });
}
