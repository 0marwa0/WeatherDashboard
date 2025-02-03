'use client';

import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import FavoriteItem from './FavoriteItem';
import ForecastModal from './ForecastModal';
import {
  getWeatherByCity,
  getWeatherForCities,
  getForecastByCity,
  getFavoriteCities,
  addToFavorites,
  removeFromFavorites,
} from '@/utils/api';

const DEFAULT_CITIES = ['Dubai', 'New York', 'London', 'Tokyo'];

export default function WeatherDashboard() {
  const [defaultCitiesWeather, setDefaultCitiesWeather] = useState([]);
  const [searchedCityWeather, setSearchedCityWeather] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [favoriteWeather, setFavoriteWeather] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [forecast, setForecast] = useState(null);

  // Only run on client side
  useEffect(() => {
    loadDefaultCities();
    loadFavorites();
  }, []);

  const loadDefaultCities = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getWeatherForCities(DEFAULT_CITIES);
      setDefaultCitiesWeather(data);
    } catch (err) {
      console.error('Failed to load default cities:', err);
      setError('Error loading default cities. Please check your API key configuration.');
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    if (typeof window === 'undefined') return; // Don't run on server

    const favorites = await getFavoriteCities();
    setFavoriteCities(favorites);
    if (favorites.length > 0) {
      try {
        const data = await getWeatherForCities(favorites);
        setFavoriteWeather(data);
      } catch (err) {
        console.error('Failed to load favorite cities:', err);
      }
    }
  };

  const handleSearch = async (city) => {
    try {
      setSearchLoading(true);
      setError('');
      const data = await getWeatherByCity(city);
      setSearchedCityWeather(data);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to find city. Please try again.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleToggleFavorite = async (cityName) => {
    if (typeof window === 'undefined') return; // Don't run on server

    const isFavorite = favoriteCities.includes(cityName);
    if (isFavorite) {
      await removeFromFavorites(cityName);
      setFavoriteCities(prev => prev.filter(city => city !== cityName));
      setFavoriteWeather(prev => prev.filter(weather => weather.name !== cityName));
    } else {
      await addToFavorites(cityName);
      setFavoriteCities(prev => [...prev, cityName]);
      try {
        const weatherData = await getWeatherByCity(cityName);
        setFavoriteWeather(prev => [...prev, weatherData]);
      } catch (err) {
        console.error('Failed to fetch weather for favorite city:', err);
      }
    }
  };

  const handleViewDetails = async (cityName) => {
    try {
      setError('');
      const forecastData = await getForecastByCity(cityName);
      setForecast(forecastData);
      setSelectedCity(cityName);
    } catch (err) {
      console.error('Failed to fetch forecast:', err);
      setError('Failed to load forecast data. Please try again.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} disabled={searchLoading} />
          
          {error && (
            <div className="text-red-500 text-center mt-4 p-2 bg-red-50/10 rounded-xl">
              {error}
            </div>
          )}
          
          {searchedCityWeather && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-300 mb-4">Search Result</h2>
              <WeatherCard
                weather={searchedCityWeather}
                isFavorite={favoriteCities.includes(searchedCityWeather.name)}
                onToggleFavorite={handleToggleFavorite}
                onViewDetails={handleViewDetails}
              />
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Popular Cities</h2>
          {loading ? (
            <div className="text-center text-lg text-gray-400">Loading cities...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {defaultCitiesWeather.map((weather, index) => (
                <WeatherCard
                  key={`default-${weather.name}-${index}`}
                  weather={weather}
                  isFavorite={favoriteCities.includes(weather.name)}
                  onToggleFavorite={handleToggleFavorite}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Favorites Sidebar */}
      <div className="w-full lg:w-80 shrink-0">
        <div className="bg-[#232b36] rounded-2xl p-6 lg:sticky lg:top-4">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Favorite Cities</h2>
          <div className="space-y-3">
            {favoriteWeather.length === 0 ? (
              <p className="text-gray-400 text-sm">No favorite cities yet. Click the star icon to add cities to your favorites.</p>
            ) : (
              favoriteWeather.map((weather, index) => (
                <FavoriteItem
                  key={`favorite-${weather.name}-${index}`}
                  weather={weather}
                  onToggleFavorite={handleToggleFavorite}
                  onViewDetails={handleViewDetails}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {forecast && selectedCity && (
        <ForecastModal
          forecast={forecast}
          city={selectedCity}
          onClose={() => {
            setForecast(null);
            setSelectedCity(null);
          }}
        />
      )}
    </div>
  );
}
