'use client';

import dynamic from 'next/dynamic';
import WeatherDashboard from './WeatherDashboard';

// Prevent SSR for WeatherDashboard
const ClientWeatherDashboard = dynamic(() => Promise.resolve(WeatherDashboard), {
  ssr: false
});

export default ClientWeatherDashboard;
