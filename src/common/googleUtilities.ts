import { FetchGoogleRoutesRequest, WandersRouteRequest } from './common';

const createGoogleDirectionsRequest = (
  routingRequest: WandersRouteRequest
): google.maps.DirectionsRequest => {
  try {
    // console.log("This: ", this);
    const { orderedStops } = routingRequest;
    const noOrderedStops = orderedStops.length;
    const origin: google.maps.Place = { placeId: orderedStops[0] };
    const destination: google.maps.Place = {
      placeId: orderedStops[noOrderedStops - 1],
    };
    let myRequest: google.maps.DirectionsRequest = {
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };
    if (noOrderedStops > 2) {
      const intermediateStops = orderedStops.slice(1, noOrderedStops - 1);
      const waypoints: google.maps.DirectionsWaypoint[] = [];
      intermediateStops.map((stop: string) =>
        waypoints.push({ location: { placeId: stop } })
      );
      myRequest = {
        ...myRequest,
        waypoints,
      };
    }
    if (routingRequest.alternativeRoutes !== undefined) {
      myRequest = {
        ...myRequest,
        provideRouteAlternatives: routingRequest.alternativeRoutes,
      };
    }
    // const waypoints
    return myRequest;
  } catch (error) {
    throw new Error(`Unable to create directions request. ${error.message}`);
  }
};

export function fetchGoogleRoutes(fetchParameters: FetchGoogleRoutesRequest) {
  // eslint-disable-next-line no-undef
  return new Promise<google.maps.DirectionsResult>((resolve, reject) => {
    try {
      const { service, parameters } = fetchParameters;
      console.log('Service: ', service);
      console.log('Parameters: ', parameters);
      const googleDirectionsRequest = createGoogleDirectionsRequest(parameters);
      if (service !== undefined) {
        console.log('Inside service check', service.route, googleDirectionsRequest);
        service.route(googleDirectionsRequest, (response: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
          console.log(response, status);
          if (status === 'OK') {
            console.log('Routing response: ', JSON.stringify(response));
            resolve(response as google.maps.DirectionsResult);
          } else reject('Nope');
        });
      } else throw new Error('Service is undefined, and should not be');
    } catch (err) {
      console.log(err.message);
      throw new Error(err);
    }
  });
}
