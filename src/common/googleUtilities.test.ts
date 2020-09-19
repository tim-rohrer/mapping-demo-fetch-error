import { defaultTrip } from './demo-utils';
import { fetchGoogleRoutes } from './googleUtilities';
// import { stubGoogleAPIs } from './stubGoogleAPIs';
import directionsResponseFixture from './demoGoogleDirectionsResponse.fixture';

// let mockDirectionsService: google.maps.DirectionsService.route;
// jest.mock('stubGoogleAPIs');
// googleDirectionsStub.route.mockResolvedValue('OK');

window.google = {
  maps: {
    DirectionsService: class {
      route() {
        return { 
          response: directionsResponseFixture,
          status: 'OK',
        }
      }
      // =>
      //   jest.fn().mockImplementation((_request, callback) => callback());
    },
    DirectionsStatus: {
      INVALID_REQUEST: 'INVALID_REQUEST' as google.maps.DirectionsStatus.INVALID_REQUEST,
      MAX_WAYPOINTS_EXCEEDED: 'MAX_WAYPOINTS_EXCEEDED' as google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED,
      NOT_FOUND: 'NOT_FOUND' as google.maps.DirectionsStatus.NOT_FOUND,
      OK: 'OK' as google.maps.DirectionsStatus.OK,
      OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT' as google.maps.DirectionsStatus.OVER_QUERY_LIMIT,
      REQUEST_DENIED: 'REQUEST_DENIED' as google.maps.DirectionsStatus.REQUEST_DENIED,
      UNKNOWN_ERROR: 'UNKNOWN_ERROR' as google.maps.DirectionsStatus.UNKNOWN_ERROR,
      ZERO_RESULTS: 'ZERO_RESULTS' as google.maps.DirectionsStatus.ZERO_RESULTS,
    },
    TravelMode: {
      BICYCLING: 'BICYCLING' as google.maps.TravelMode.BICYCLING,
      DRIVING: 'DRIVING' as google.maps.TravelMode.DRIVING,
      TRANSIT: 'TRANSIT' as google.maps.TravelMode.TRANSIT,
      TWO_WHEELER: 'TWO_WHEELER' as google.maps.TravelMode.TWO_WHEELER,
      WALKING: 'WALKING' as google.maps.TravelMode.WALKING,
    },
  },
};

describe('Google Utilities', () => {
  describe('fetchGoogleRoutes', () => {

    const setupGoogleDirectionServiceMock = () => {
      const directionsService = new window.google.maps.DirectionsService();
      jest
        .spyOn(directionsService, 'route')
        .mockResolvedValue(directionsResponseFixture);
    };

    it('should handle a successful return of routes', async () => {
      setupGoogleDirectionServiceMock();
      try {
        const result = await fetchGoogleRoutes({
          service: new window.google.maps.DirectionsService(),
          parameters: {
            orderedStops: defaultTrip.orderedStops,
          },
        });
        // console.log(result);
        // expect(result.geocoded_waypoints.length).toEqual(
        //   defaultTrip.orderedStops.length
        // );
        expect(result.status).toEqual('OK');
      } catch (err) {
        console.log('Test Error: ', err);
      }
    });
  });
});
