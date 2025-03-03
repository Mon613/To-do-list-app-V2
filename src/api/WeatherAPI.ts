import axios from "axios";
import { WeatherMe } from "../types/WeatherMe";

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

export const fetchWeather = async (latitude: number | null, longitude: number | null): Promise<WeatherMe> => {
    try {
        const params = {
            latitude,
            longitude,
            hourly: "temperature_2m,relative_humidity_2m,visibility,wind_speed_10m",
            daily: "temperature_2m_max,temperature_2m_min",
            timezone: "Asia/Ho_Chi_Minh",
            forecast_days: 1,
        };
        const { data } = await axios.get(WEATHER_API_URL, { params });
        const now = new Date().getHours();
        return {
            temperature: Math.round(data.hourly.temperature_2m[now]),
            humidity: data.hourly.relative_humidity_2m[0],
            windSpeed: data.hourly.wind_speed_10m[0],
            maxTemperature: data.daily.temperature_2m_max[0],
            minTemperature: data.daily.temperature_2m_min[0],
        }
    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
};