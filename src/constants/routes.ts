/**
 * Application route constants mapping public and shelter operational paths.
 */
export const ROUTES = {
  PUBLIC: {
    ROOT: "/",
    CHAT: "/chat",
    HELP: "/help",
    SETTINGS: "/settings",
  },
  SHELTER: {
    ROOT: "/shelter",
    DASHBOARD: "/shelter/dashboard",
    SHELTERS: "/shelter/shelters",
    PEOPLE: "/shelter/people",
    CASES: "/shelter/cases",
    SEARCH: "/shelter/search",
    AI: "/shelter/ai",
    ACTIVITY: "/shelter/activity",
    SETTINGS: "/shelter/settings",
  },
} as const;

export type PublicRoute = (typeof ROUTES.PUBLIC)[keyof typeof ROUTES.PUBLIC];
export type ShelterRoute = (typeof ROUTES.SHELTER)[keyof typeof ROUTES.SHELTER];
export type AppRoute = PublicRoute | ShelterRoute;
