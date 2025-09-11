import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { WeatherCard } from '@/components/WeatherCard';
import { SearchForm } from '@/components/SearchForm';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useWeatherInfo } from '@/hooks/useweatherInfo';
import { useDarkMode } from '@/hooks/useDarkMode';

function App() {
  // The hook expects a city, but SearchForm prop is named country; we treat it as a location query.
  const { loading, error, data, fetchWeatherData } = useWeatherInfo();
  const [country, setCountry] = useState(''); // naming kept to match SearchForm API
  const { isDark, toggle: toggleDark } = useDarkMode();

  const handleSearch = () => {
    fetchWeatherData(country.trim());
  };

  return (
    <div className="min-h-dvh w-full bg-gradient-to-br from-stone-50 via-slate-50 to-stone-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14 flex flex-col gap-10">
  <header className="flex flex-col items-center gap-4 text-center relative">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500 dark:from-slate-200 dark:via-slate-300 dark:to-slate-400">
            Weather Insight
          </h1>
          <p className="max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Search any city to view current temperature and how it really feels. Powered by OpenWeatherMap.
          </p>
          <SearchForm
            country={country}
            setCountry={setCountry}
            onSearch={handleSearch}
            loading={loading}
          />
        </header>

        {error && (
          <div className="animate-in fade-in slide-in-from-top-1 duration-300">
            <ErrorMessage message={error} />
          </div>
        )}

        <main className="grid place-items-center">
          {loading && (
            <div className="w-full max-w-lg animate-pulse">
              <div className="rounded-2xl border border-border/60 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md p-6 flex flex-col gap-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="space-y-3 w-2/3">
                    <div className="h-5 w-32 rounded bg-foreground/10 dark:bg-white/10" />
                    <div className="h-3 w-20 rounded bg-foreground/10 dark:bg-white/10" />
                  </div>
                  <div className="h-12 w-12 rounded-full bg-foreground/10 dark:bg-white/10" />
                </div>
                <div className="flex items-center gap-6">
                  <div className="h-14 w-24 rounded bg-foreground/10 dark:bg-white/10" />
                  <div className="flex flex-col gap-3 w-full">
                    <div className="h-4 w-28 rounded bg-foreground/10 dark:bg-white/10" />
                    <div className="h-4 w-16 rounded bg-foreground/10 dark:bg-white/10" />
                  </div>
                </div>
                <div className="h-4 w-24 rounded bg-foreground/10 dark:bg-white/10 ml-auto" />
              </div>
            </div>
          )}

            {!loading && data && (
              <div className="w-full max-w-lg animate-in fade-in zoom-in-50 duration-500">
                <WeatherCard
                  city={data.city}
                  country={data.country}
                  temp={data.temp}
                  feels_like={data.feels_like}
                />
              </div>
            )}

            {!loading && !data && !error && (
              <div className="text-center text-muted-foreground text-sm sm:text-base">
                Enter a city above to get the latest weather.
              </div>
            )}
        </main>

        <footer className="mt-8 text-center text-[11px] text-muted-foreground">
          <span>Data provided by OpenWeatherMap • Built with Vite + React + Tailwind</span>
        </footer>
      </div>
      <button
        type="button"
        onClick={toggleDark}
        className="fixed top-3 right-3 z-50 inline-flex items-center justify-center rounded-full h-10 w-10 bg-black/5 dark:bg-white/10 backdrop-blur-sm hover:bg-black/10 dark:hover:bg-white/15 transition-all border border-border/60 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span className="relative flex items-center justify-center">
          {isDark ? (
            <Sun className="h-5 w-5 text-amber-300 transition-transform duration-500 rotate-[360deg]" />
          ) : (
            <Moon className="h-5 w-5 text-slate-700 dark:text-slate-200 transition-transform duration-500" />
          )}
        </span>
        <span className="sr-only">{isDark ? 'Light mode' : 'Dark mode'}</span>
      </button>
    </div>
  );
}

export default App;
