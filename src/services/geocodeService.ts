export async function geocodeLocation(location: string): Promise<{ lat: number; lng: number } | null> {
  // Example using OpenStreetMap Nominatim API
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
  );
  const data = await response.json();
  if (data && data.length > 0 && data[0].lat && data[0].lon) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  }
  return null;
}