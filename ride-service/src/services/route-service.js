import fetch from "node-fetch";
import env from "../../env.js";
import ApiError from "../../utils/ApiError.js";

class RouteService {
  static async routeInformation(pickupLat, pickupLng, dropoffLat, dropoffLng) {
    if (!pickupLat || !pickupLng || !dropoffLat || !dropoffLng) {
      throw new ApiError(400, "Pickup and Dropoff coordinates are required");
    }
    const url =
      `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/` +
      `${pickupLng},${pickupLat};${dropoffLng},${dropoffLat}` +
      `?geometries=geojson&overview=full&access_token=${env.MAPBOX_ACCESS_TOKEN}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new ApiError(response.status, response.statusText);
    }
    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
      throw new ApiError(400, "No route found");
    }

    return {
      route: data.routes[0].geometry,
      distanceInKM: data.routes[0].distance / 1000,
      durationInMinutes: data.routes[0].duration / 60,
    };
  }
}

export default RouteService;
