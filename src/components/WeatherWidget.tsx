import React, { useEffect, useState } from "react";
import { fetchWeather } from "../services/weatherService";

interface WeatherWidgetProps {
  lat: number;
  lon: number;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ lat, lon }) => {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather(lat, lon)
      .then(setWeather)
      .catch(() => setError("Could not fetch weather"));
  }, [lat, lon]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!weather) return <div>Loading weather...</div>;

  return (
    <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 mt-4">
      <div className="font-semibold">
        {weather.location.name}, {weather.location.region}
      </div>
      <div className="flex items-center gap-2">
        <img src={weather.current.condition.icon} alt="" />
        <span className="text-lg">{weather.current.temp_c}°C</span>
        <span className="text-gray-700">{weather.current.condition.text}</span>
      </div>
      <div className="text-xs text-gray-500">
        Wind: {weather.current.wind_kph} kph
      </div>
    </div>
  );
};

export default WeatherWidget;
