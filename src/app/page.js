import ClientWeatherDashboard from '@/components/ClientWeatherDashboard';

export const metadata = {
  title: 'Weather Dashboard',
  description: 'A real-time weather dashboard showing weather information for multiple cities',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a1f24] text-white p-4 sm:p-8">
      <div className="max-w-[1400px] mx-auto">
        <ClientWeatherDashboard />
      </div>
    </main>
  );
}
