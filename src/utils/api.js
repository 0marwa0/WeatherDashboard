// const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const API_KEY = "3909ccc8117eb7de01eae80ab6e2818e"
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city) => {
  if (!API_KEY) {
    throw new Error('OpenWeather API key is not configured');
  }

  try {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    console.log('Fetching weather for:', city);
    
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch weather data');
    }

    return data;
  } catch (error) {
    console.error('Error fetching weather for', city, ':', error.message);
    throw error;
  }
};

export const getForecastByCity = async (city) => {
  if (!API_KEY) {
    throw new Error('OpenWeather API key is not configured');
  }

  try {
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    console.log('Fetching forecast for:', city);
    
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch forecast data');
    }

    return data;
  } catch (error) {
    console.error('Error fetching forecast for', city, ':', error.message);
    throw error;
  }
};

export const getWeatherForCities = async (cities) => {
  if (!Array.isArray(cities) || cities.length === 0) {
    throw new Error('Invalid cities array');
  }

  try {
    const weatherData = await Promise.all(
      cities.map(city => getWeatherByCity(city))
    );
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather for cities:', error.message);
    throw error;
  }
};

// Local Storage utilities
export const getFavoriteCities = () => {
  if (typeof window === 'undefined') return [];
  const favorites = localStorage.getItem('favoriteCities');
  return favorites ? JSON.parse(favorites) : [];
};

export const addToFavorites = (city) => {
  const favorites = getFavoriteCities();
  if (!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
  }
};

export const removeFromFavorites = (city) => {
  const favorites = getFavoriteCities();
  const updatedFavorites = favorites.filter(c => c !== city);
  localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
};
