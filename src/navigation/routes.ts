/**
 * Centralized Route Map
 * Avoid hardcoded route strings across features to ensure type-safe navigation.
 */
export const Routes = {
  Home: '/',
  Pagination: '/pagination',
  // New practice routes will be declared here
} as const;

export type RouteKey = keyof typeof Routes;
export type RoutePath = (typeof Routes)[RouteKey];
