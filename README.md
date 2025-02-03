# Next.js Weather Dashboard

A modern weather dashboard built with Next.js that allows users to check weather conditions and forecasts for multiple cities.

<img width="677" alt="Screenshot 2025-02-03 at 9 04 06 AM" src="https://github.com/user-attachments/assets/f013c689-bf0d-4465-9da3-942594f7baff" />


## Features

- Real-time weather data from OpenWeather API
- Search weather by city name
- View detailed weather information including temperature, humidity, and wind speed
- Save favorite cities for quick access
- Responsive design for desktop and mobile devices

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeather API key

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd next-weather-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your OpenWeather API key:
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```
next-weather-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.js      # Root layout component
│   │   └── page.js        # Main page component
│   ├── components/
│   │   ├── WeatherDashboard.js        # Server-side weather component
│   │   └── ClientWeatherDashboard.js  # Client-side weather component
│   └── utils/
│       └── api.js         # API utilities and weather data fetching
```

## API Integration

The application uses the OpenWeather API to fetch weather data. The integration is handled in `src/utils/api.js` with the following main functions:

- `getWeatherByCity(city)`: Fetches current weather data for a specific city
- `getForecastByCity(city)`: Retrieves weather forecast data
- `getWeatherForCities(cities)`: Fetches weather data for multiple cities
- `getFavoriteCities()`: Manages locally stored favorite cities
- `addToFavorites(city)`: Adds a city to favorites
- `removeFromFavorites(city)`: Removes a city from favorites

The application uses both server-side and client-side components to optimize performance and provide real-time updates.

## Environment Variables

Required environment variables:
- `NEXT_PUBLIC_OPENWEATHER_API_KEY`: Your OpenWeather API key

## Contributing

Feel free to submit issues and pull requests to improve the application.

## License

[MIT License](LICENSE)
