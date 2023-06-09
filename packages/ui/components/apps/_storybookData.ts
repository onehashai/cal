import type { AppFrontendPayload as App } from "@calcom/types/App";

export const _SBApps: App[] = [
  {
    name: "Google Calendar",
    description: "Google Calendar",
    installed: true,
    type: "google_calendar",
    title: "Google Calendar",
    imageSrc: "/api/app-store/googlecalendar/icon.svg",
    variant: "calendar",
    category: "calendar",
    categories: ["calendar"],
    logo: "/api/app-store/googlecalendar/icon.svg",
    publisher: "OneHashCal",
    rating: 5,
    reviews: 69,
    slug: "google-calendar",
    trending: false,
    url: "https://cal.com/",
    verified: true,
    email: "support@onehash.ai",
    dirName: "googlecalendar",
  },
  {
    name: "Zoom Video",
    description: "Zoom Video",
    type: "zoom_video",
    categories: ["video"],
    imageSrc: "/api/app-store/zoomvideo/icon.svg",
    variant: "conferencing",
    logo: "/api/app-store/zoomvideo/icon.svg",
    publisher: "OneHashCal",
    url: "https://zoom.us/",
    verified: true,
    rating: 4.3, // TODO: placeholder for now, pull this from TrustPilot or G2
    reviews: 69, // TODO: placeholder for now, pull this from TrustPilot or G2
    category: "video",
    slug: "zoom",
    title: "Zoom Video",
    trending: true,
    email: "support@onehash.ai",
    appData: {
      location: {
        default: false,
        linkType: "dynamic",
        type: "integrations:zoom",
        label: "Zoom Video",
      },
    },
    dirName: "zoomvideo",
  },
];

export const _SBAppCategoryList = [
  {
    name: "Calendar",
    count: 1,
  },
  {
    name: "Video",
    count: 5,
  },
];
