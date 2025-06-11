import { RouteRequest, RouteData, Coordinates, VehicleType } from '../types';

// Vehicle types for emissions calculations
export const vehicleTypes: VehicleType[] = [
  { id: 'petrol', name: 'Petrol Car', emissionFactor: 2.31, icon: '⛽' },
  { id: 'diesel', name: 'Diesel Car', emissionFactor: 2.68, icon: '🚗' },
  { id: 'electric', name: 'Electric Vehicle', emissionFactor: 0.05, icon: '🔋' },
  { id: 'hybrid', name: 'Hybrid Car', emissionFactor: 1.2, icon: '🌿' }
];

// Fetch a real route from OpenRouteService API
export async function fetchRoute(
  start: Coordinates,
  end: Coordinates,
  mode: "lowest" | "balanced" | "fastest" = "fastest"
): Promise<Coordinates[]> {
  const apiKey = "5b3ce3597851110001cf62485638738a9b1e49f39c7992160857b0d0"; // Replace with your OpenRouteService API key

  // Use different profiles or simulate based on mode
  let profile = "driving-car";
  if (mode === "fastest") profile = "driving-car";
  else if (mode === "lowest") profile = "driving-hgv"; // Simulate eco by using HGV profile (less urban, less elevation)
  else if (mode === "balanced") profile = "driving-car"; // You can adjust as needed

  const response = await fetch(
    `https://api.openrouteservice.org/v2/directions/${profile}?api_key=${apiKey}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`
  );
  const data = await response.json();
  if (
    data &&
    data.features &&
    data.features[0] &&
    data.features[0].geometry &&
    data.features[0].geometry.coordinates
  ) {
    // Convert [lng, lat] to { lat, lng }
    return data.features[0].geometry.coordinates.map(
      ([lng, lat]: [number, number]) => ({ lat, lng })
    );
  }
  return [];
}

// Calculate eco route and emissions
export const calculateEcoRoute = async (
  request: RouteRequest & { mode: "lowest" | "balanced" | "fastest" }
): Promise<RouteData> => {
  const { source, destination, vehicleType, mode } = request;

  // Fetch the real route from OpenRouteService using the selected mode
  const ecoPath = await fetchRoute(source, destination, mode);
  const shortestPath = await fetchRoute(source, destination, "fastest");

  // Calculate base distance using the fetched path
  const calculateDistance = (points: Coordinates[]): number => {
    let dist = 0;
    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1];
      const p2 = points[i];
      const R = 6371;
      const dLat = (p2.lat - p1.lat) * Math.PI / 180;
      const dLon = (p2.lng - p1.lng) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      dist += R * c;
    }
    return dist;
  };

  const ecoDistance = calculateDistance(ecoPath);
  const shortestDistance = calculateDistance(shortestPath);

  // Get vehicle emission factor
  const vehicle = vehicleTypes.find(v => v.id === vehicleType);
  const emissionFactor = vehicle?.emissionFactor || 2.0;

  // Calculate emissions
  const ecoEmissions = ecoDistance * emissionFactor;
  const shortestEmissions = shortestDistance * emissionFactor;

  const co2Saved = Math.max(0, shortestEmissions - ecoEmissions);
  const percentageSaved = shortestEmissions > 0 ? (co2Saved / shortestEmissions) * 100 : 0;

  return {
    ecoRoute: {
      path: ecoPath.map(p => ({ ...p, elevation: Math.random() * 100 })),
      distance: Math.round(ecoDistance * 10) / 10,
      estimatedTime: Math.round(ecoDistance / 50 * 60), // Assume 50 km/h average speed
      elevationGain: Math.round(Math.random() * 20)
    },
    shortestRoute: {
      path: shortestPath.map(p => ({ ...p, elevation: Math.random() * 100 })),
      distance: Math.round(shortestDistance * 10) / 10,
      estimatedTime: Math.round(shortestDistance / 50 * 60),
      elevationGain: Math.round(Math.random() * 20)
    },
    emissions: {
      ecoRouteCO2: Math.round(ecoEmissions * 100) / 100,
      shortestRouteCO2: Math.round(shortestEmissions * 100) / 100,
      co2Saved: Math.round(co2Saved * 100) / 100,
      percentageSaved: Math.round(percentageSaved * 10) / 10
    },
    vehicleType,
    mode
  };
};