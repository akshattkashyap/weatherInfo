import { useState, useCallback } from "react";
import type { weatherStats, simpleWeather } from "../types/weatherStats";

const toCelsius = (k: number) => Math.round((k - 273.15) * 10) / 10;

export const useWeatherInfo = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<simpleWeather | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherData = useCallback(async (city: string) => {
        if (!city.trim()) {
            setError("Enter a valid City name");
            return;
        }

        setLoading(true);
        setError(null);
        setData(null);

        try {
            const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
            if (!API_KEY) {
                setError("Missing API key configuration");
                setLoading(false);
                return;
            }

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&APPID=${API_KEY}`
            );

            if (!response.ok) {
                if (response.status === 404) throw new Error("City not found");
                if (response.status === 401) throw new Error("Invalid API key");
                if (response.status === 429) throw new Error("Too many requests, try later");
                throw new Error(`Failed to fetch data: ${response.status}`);
            }

            const result: weatherStats = await response.json();

            const processedData: simpleWeather = {
                city: result.name,
                country: result.sys.country,
                temp: toCelsius(result.main.temp),
                feels_like: toCelsius(result.main.feels_like),
            };

            setData(processedData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, data, fetchWeatherData };
}

