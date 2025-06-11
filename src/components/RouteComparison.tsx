import React, { useState } from "react";
import { RouteData } from "../types";

interface RouteComparisonProps {
  data: RouteData;
}

const RouteComparison: React.FC<RouteComparisonProps> = ({ data }) => {
  const [sideBySide, setSideBySide] = useState(false);

  const { shortestRoute, ecoRoute, emissions } = data;

  return (
    <div className="my-6">
      <div className="flex items-center mb-2">
        <h4 className="font-bold text-gray-800 mr-4">Route Comparison</h4>
        <button
          className="text-blue-600 underline text-sm"
          onClick={() => setSideBySide((v) => !v)}
        >
          {sideBySide ? "Show as Table" : "Show Side-by-Side"}
        </button>
      </div>
      {sideBySide ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 border">
            <h5 className="font-semibold text-blue-700 mb-2">Standard Route</h5>
            <p>
              <b>Distance:</b> {shortestRoute.distance} km
            </p>
            <p>
              <b>CO₂ Emission:</b> {emissions.shortestRouteCO2} kg
            </p>
            <p>
              <b>Time:</b> {shortestRoute.estimatedTime} min
            </p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border">
            <h5 className="font-semibold text-emerald-700 mb-2">Eco Route</h5>
            <p>
              <b>Distance:</b> {ecoRoute.distance} km
            </p>
            <p>
              <b>CO₂ Emission:</b> {emissions.ecoRouteCO2} kg
            </p>
            <p>
              <b>Time:</b> {ecoRoute.estimatedTime} min
            </p>
          </div>
        </div>
      ) : (
        <table className="w-full mt-2 border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Metric</th>
              <th className="p-2 text-blue-700">Standard Route</th>
              <th className="p-2 text-emerald-700">Eco Route</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">Distance</td>
              <td className="p-2">{shortestRoute.distance} km</td>
              <td className="p-2">{ecoRoute.distance} km</td>
            </tr>
            <tr>
              <td className="p-2">CO₂ Emission</td>
              <td className="p-2">{emissions.shortestRouteCO2} kg</td>
              <td className="p-2">{emissions.ecoRouteCO2} kg</td>
            </tr>
            <tr>
              <td className="p-2">Time</td>
              <td className="p-2">{shortestRoute.estimatedTime} min</td>
              <td className="p-2">{ecoRoute.estimatedTime} min</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RouteComparison;
