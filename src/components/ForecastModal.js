'use client';

const ForecastModal = ({ forecast, city, onClose }) => {
  if (!forecast) return null;

  // Group forecast data by day using UTC to avoid timezone issues
  const dailyForecasts = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
      timeZone: 'UTC'
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-[#232b36] rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#232b36] p-4 sm:p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {city}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 sm:p-6">
          {Object.entries(dailyForecasts).map(([date, forecasts]) => (
            <div key={date} className="mb-6 last:mb-0">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'UTC'
                })}
              </h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {forecasts.map((item) => (
                  <div
                    key={item.dt}
                    className="bg-[#2a3441] p-3 sm:p-4 rounded-lg sm:rounded-xl"
                  >
                    <div className="text-center">
                      <p className="text-gray-400 text-sm sm:text-base mb-1 sm:mb-2">
                        {new Date(item.dt * 1000).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          timeZone: 'UTC'
                        })}
                      </p>
                      <div className="flex items-center justify-center">
                        <img
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          alt={item.weather[0].description}
                          className="w-12 h-12 sm:w-16 sm:h-16"
                          width={64}
                          height={64}
                        />
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-white mb-1">
                        {Math.round(item.main.temp)}°
                      </p>
                      <p className="text-gray-400 capitalize text-xs sm:text-sm">
                        {item.weather[0].description}
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between text-gray-400">
                        <span>Humidity</span>
                        <span className="text-white">{item.main.humidity}%</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Wind</span>
                        <span className="text-white">{item.wind.speed} km/h</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForecastModal;
