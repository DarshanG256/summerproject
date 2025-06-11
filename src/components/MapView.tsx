import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { RouteData } from "../types";
import L from "leaflet";

// Custom marker icon for Leaflet
const icon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

interface MapViewProps {
  routeData: RouteData | null;
}

const MapView: React.FC<MapViewProps> = ({ routeData }) => {
  if (!routeData || !routeData.ecoRoute.path.length) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <p className="text-gray-600">
          Enter your starting point and destination to see the eco-optimized
          route
        </p>
      </div>
    );
  }

  const ecoPath = routeData.ecoRoute.path.map((p) => [p.lat, p.lng]) as [
    number,
    number
  ][];
  const shortestPath = routeData.shortestRoute.path.map((p) => [
    p.lat,
    p.lng,
  ]) as [number, number][];
  const start = ecoPath[0];
  const end = ecoPath[ecoPath.length - 1];

  return (
    <MapContainer
      center={start}
      zoom={8}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Alternate route (blue, dashed) */}
      {shortestPath.length > 1 && (
        <Polyline
          positions={shortestPath}
          color="blue"
          weight={4}
          dashArray="8"
        />
      )}
      {/* Eco route (green, solid) */}
      {ecoPath.length > 1 && (
        <Polyline positions={ecoPath} color="green" weight={5} />
      )}
      <Marker position={start} icon={icon}>
        <Popup>Start</Popup>
      </Marker>
      <Marker position={end} icon={icon}>
        <Popup>End</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
