const WEATHER_API_KEY = "ba46e31d0b594c1985192935251106";

export async function fetchWeather(lat: number, lon: number) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Weather fetch failed");
  return response.json();
}