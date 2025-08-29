export default function Card({ weather }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
      <h2 className="text-xl font-bold mb-2">
        {weather.name}, {weather.country}
      </h2>
      <p className="text-4xl font-semibold">{weather.temperature}°C</p>
      <p className="capitalize text-gray-600">
        Wind: {weather.windspeed} km/h
      </p>
      <p className="text-gray-500">Direction: {weather.winddirection}°</p>
      <p className="mt-2 text-sm text-gray-400">
        Last updated: {new Date(weather.time).toLocaleTimeString()}
      </p>
    </div>
  );
}
