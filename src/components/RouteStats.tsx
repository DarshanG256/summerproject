import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, TrendingUp, Car } from "lucide-react";
import { RouteData } from "../types";
import WhyThisRoute from "./WhyThisRoute";
import WeatherWidget from "./WeatherWidget";

interface RouteStatsProps {
  data: RouteData;
}

const RouteStats: React.FC<RouteStatsProps> = ({ data }) => {
  const { ecoRoute, vehicleType, emissions, mode } = data;

  const stats = [
    {
      icon: MapPin,
      label: "Distance",
      value: `${ecoRoute.distance} km`,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Clock,
      label: "Est. Time",
      value: `${ecoRoute.estimatedTime} min`,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: TrendingUp,
      label: "Elevation",
      value: `${ecoRoute.elevationGain} m`,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Car,
      label: "Vehicle",
      value: vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1),
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  // Use the first point of the ecoRoute as the weather location
  const weatherPoint =
    ecoRoute && ecoRoute.path && ecoRoute.path.length > 0
      ? ecoRoute.path[0]
      : null;

  // Helper to display mode label
  const modeLabel = (mode: string) => {
    if (mode === "lowest") return "🌿 Lowest Emission";
    if (mode === "balanced") return "🕒 Balanced";
    if (mode === "fastest") return "⚡ Fastest";
    return mode;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
        <span>Route Statistics</span>
      </h3>

      {/* Show selected mode */}
      {mode && (
        <div className="mb-2">
          <span className="text-sm text-gray-500">
            Selected Priority: <b>{modeLabel(mode)}</b>
          </span>
        </div>
      )}

      {/* Why This Route explanation */}
      <WhyThisRoute />

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-xl p-4 transition-transform hover:scale-105`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 ${stat.color} bg-white rounded-lg shadow-sm`}
              >
                <stat.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-600">{stat.label}</p>
                <p className="font-semibold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CO₂ saved message */}
      {emissions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100"
        >
          <p className="text-base text-blue-900 font-semibold">
            🎉 You saved{" "}
            <span className="font-bold">
              {emissions.co2Saved.toFixed(2)} kg
            </span>{" "}
            of CO₂ by taking this route!
          </p>
        </motion.div>
      )}

      {/* Additional info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100"
      >
        <p className="text-sm text-emerald-800 font-medium">
          🌱 This route is optimized for minimal environmental impact
        </p>
      </motion.div>

      {/* Weather Widget */}
      {weatherPoint && (
        <WeatherWidget lat={weatherPoint.lat} lon={weatherPoint.lng} />
      )}
    </motion.div>
  );
};

export default RouteStats;
