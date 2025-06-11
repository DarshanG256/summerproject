export interface Coordinates {
  lat: number;
  lng: number;
}

export interface RouteRequest {
  source: Coordinates;
  destination: Coordinates;
  vehicleType: string;
  mode: "lowest" | "balanced" | "fastest"; // <-- Add this line
}

export interface RoutePoint extends Coordinates {
  elevation?: number;
}

export interface Route {
  path: RoutePoint[];
  distance: number;
  estimatedTime: number;
  elevationGain: number;
}

export interface EmissionData {
  ecoRouteCO2: number;
  shortestRouteCO2: number;
  co2Saved: number;
  percentageSaved: number;
}

export interface RouteData {
  ecoRoute: Route;
  shortestRoute: Route; 
  emissions: EmissionData;
  vehicleType: string;
  mode: "lowest" | "balanced" | "fastest"; // <-- Add this line
}

export interface VehicleType {
  id: string;
  name: string;
  emissionFactor: number;
  icon: string;
}