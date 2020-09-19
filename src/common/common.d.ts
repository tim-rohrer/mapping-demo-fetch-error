/** Generic interface with parameters for fetching routes
 * independent of mapping service
 */
export interface WandersRouteRequest {
  orderedStops: Array<string>;
  alternativeRoutes?: boolean;
}

/** Interface for fetching from Google, using DI with the
 * DirectionsService
 */
export type FetchGoogleRoutesRequest = {
  service: google.maps.DirectionsService | undefined;
  parameters: WandersRouteRequest;
};
