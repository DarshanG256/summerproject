import React, { useState } from "react";
import { geocodeLocation } from "../services/geocodeService";
import GreenerModeSelector from "./GreenerModeSelector";

interface RouteFormProps {
  onSubmit: (data: {
    source: { lat: number; lng: number };
    destination: { lat: number; lng: number };
    vehicleType: string;
    mode: "lowest" | "balanced" | "fastest";
  }) => void;
}

const RouteForm: React.FC<RouteFormProps> = ({ onSubmit }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("petrol");
  const [formError, setFormError] = useState<string | null>(null);
  const [mode, setMode] = useState<"lowest" | "balanced" | "fastest">("lowest");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    try {
      const [srcCoords, destCoords] = await Promise.all([
        geocodeLocation(source.trim()),
        geocodeLocation(destination.trim()),
      ]);
      if (!srcCoords || !destCoords) {
        setFormError(
          "Could not find one or both locations. Please enter valid place names."
        );
        return;
      }
      onSubmit({
        source: srcCoords,
        destination: destCoords,
        vehicleType,
        mode,
      });
    } catch (err) {
      setFormError("Geocoding failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="source" className="block font-medium">
          Source
        </label>
        <input
          id="source"
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="e.g. Goa, India"
          className="border rounded px-2 py-1 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="destination" className="block font-medium">
          Destination
        </label>
        <input
          id="destination"
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g. Mumbai, India"
          className="border rounded px-2 py-1 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="vehicleType" className="block font-medium">
          Vehicle Type
        </label>
        <select
          id="vehicleType"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="ev">Electric</option>
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Route Priority</label>
        <GreenerModeSelector value={mode} onChange={setMode} />
      </div>
      {formError && <div className="text-red-600 text-sm">{formError}</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Get Route
      </button>
    </form>
  );
};

export default RouteForm;
