'use client';

const WeatherCard = ({ weather, isFavorite, onToggleFavorite, onViewDetails }) => {
  if (!weather) return null;

  return (
    <div className="bg-[#232b36] rounded-2xl p-6 text-white">
      <div className="flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">{weather.name}</h2>
            <p className="text-gray-400 text-sm">
              Chance of rain: {Math.round(weather.main.humidity)}%
            </p>
          </div>
          <button
            onClick={() => onToggleFavorite(weather.name)}
            className="text-2xl text-yellow-400 hover:text-yellow-300 focus:outline-none"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-5xl font-bold">
              {Math.round(weather.main.temp)}°
            </span>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="w-16 h-16"
              width={64}
              height={64}
            />
          </div>
          <p className="text-lg text-gray-300 capitalize">
            {weather.weather[0].description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 bg-[#2a3441] p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <div>
              <p className="text-gray-400 text-sm">Real Feel</p>
              <p className="font-semibold">{Math.round(weather.main.feels_like)}°</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div>
              <p className="text-gray-400 text-sm">Wind</p>
              <p className="font-semibold">{weather.wind.speed} km/h</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <div>
              <p className="text-gray-400 text-sm">Humidity</p>
              <p className="font-semibold">{weather.main.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
            </svg>
            <div>
              <p className="text-gray-400 text-sm">UV Index</p>
              <p className="font-semibold">3</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onViewDetails(weather.name)}
          className="w-full py-3 bg-[#1a1f24] hover:bg-[#232b36] text-white rounded-xl transition-colors font-semibold border border-gray-700"
        >
          View Forecast
        </button>
      </div>
    </div>
  );
};

export default WeatherCard;
