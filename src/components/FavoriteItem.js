'use client';

const FavoriteItem = ({ weather, onToggleFavorite, onViewDetails }) => {
  if (!weather) return null;

  return (
    <div className="bg-[#2a3441] rounded-xl p-4 hover:bg-[#313d4f] transition-colors cursor-pointer"
         onClick={() => onViewDetails(weather.name)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
            className="w-10 h-10"
          />
          <div>
            <h3 className="font-semibold text-white">{weather.name}</h3>
            <p className="text-sm text-gray-400">{weather.weather[0].description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-white">{Math.round(weather.main.temp)}°</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(weather.name);
            }}
            className="text-yellow-400 hover:text-yellow-300 focus:outline-none"
          >
            ★
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
