import { useState } from "react";
import Card from "./Card";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        name,
        country,
        ...weatherData.current_weather,
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500 p-6 md:p-12">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 text-center">
          See Today’s Weather
        </h1>

        {/* Responsive input + button */}
        <div className="flex flex-col md:flex-row w-full gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-3 md:px-5 md:py-4 text-base md:text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-600 text-white px-4 py-3 md:px-5 md:py-4 text-base md:text-lg rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-200">{error}</p>}
        {weather && <Card weather={weather} />}
      </div>
    </div>
  );
}
