import { useEffect, useState } from "react";
import './MyWeather.css'
import UserLocation from "./UserLocation";
import { WeatherMe } from "./WeatherMe";
import axios from "axios";

export const MyWeather = () => {
    const location = UserLocation();
    const [weather, setWeather] = useState<WeatherMe | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [locationUser, setLocation] = useState<string>("Đang tải...");

    useEffect(() => {

        if (location.latitude && location.longitude) {
            fetchWeather(location.latitude, location.longitude);
            fetchLocationName(location.latitude, location.longitude);
        }

    }, [location]);
    const fetchWeather = async (latitude: number | null, longitude: number | null) => {
        try {
            const api = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,visibility,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FHo_Chi_Minh&forecast_days=1`
            );
            const now = new Date().getHours();

            console.log(now);
            setWeather({
                temperature: api.data.hourly.temperature_2m[now-1],
                humidity: api.data.hourly.relative_humidity_2m[0],
                windSpeed: api.data.hourly.wind_speed_10m[0],
                maxTemperature: api.data.daily.temperature_2m_max[0],
                minTemperature: api.data.daily.temperature_2m_min[0],
            })
        } catch (e) {
            console.log("Error: ", e)
        } finally {
            setLoading(false);
        }
    }
    const fetchLocationName = async (lat: number, lon: number) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
            setLocation(response.data.address.city || "Không xác định");
        } catch (error) {
            console.error("Lỗi khi lấy tên vị trí:", error);
            setLocation("Không xác định");
        }
    };
    return (
        <>
            <div className="myWeather">
                <div className="location"><h2>{locationUser}</h2></div>
                <div className="temperature"><h4><i className="bi bi-thermometer-half"/>{weather?.temperature}°C</h4></div>
                <div className="weatherDetail">
                    <div className="windSpeed">
                        <p>Tốc độ gió</p>
                        <p>{weather?.windSpeed}km/h</p>
                    </div>
                    <div className="maxTemperature">
                        <p>Nhiệt độ tối đa</p>
                        <p><i className="bi bi-thermometer-high"/>{weather?.maxTemperature}°C</p>
                    </div>
                    <div className="minTemperature">
                        <p>Nhiệt độ tối thiểu</p>
                        <p><i className="bi bi-thermometer"/>{weather?.minTemperature}°C</p>
                    </div>
                </div>

            </div>
        </>
    )
}
export default MyWeather;