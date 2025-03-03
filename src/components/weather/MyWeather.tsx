import { useEffect, useState } from "react";
import './MyWeather.css'
import UserLocation from "../../hooks/UserLocationHook";
import { WeatherMe } from "../../types/WeatherMe";
import { fetchWeather } from "../../api/WeatherAPI";
import { fetchLocationName } from "../../api/WeatherLocationAPI";
import axios from "axios";


export const MyWeather = () => {
    const location = UserLocation();
    const [weather, setWeather] = useState<WeatherMe | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [locationUser, setLocation] = useState<string>("Đang tải...");

    useEffect(() => {
        if (location.latitude && location.longitude) {
            (async () => {
                try {
                    const [weatherData, locationName] = await Promise.all([
                        fetchWeather(location.latitude, location.longitude),
                        fetchLocationName(location.latitude, location.longitude)
                    ]);
                    setWeather(weatherData);
                    setLocation(locationName);
                } catch (e) {
                    console.log("Error: ", e);

                } finally {
                    setLoading(false);
                }
            })();

        }
    }, [location]);
    return (
        <>
            <div className="myWeather">
                <div className="location"><h2>{locationUser} </h2><i className="bi bi-send-fill" /></div>
                <div className="temperature"><h4><i className="bi bi-thermometer-half" />{weather?.temperature}°C</h4></div>
                <div className="weatherDetail">
                    <div className="windSpeed">
                        <p>Tốc độ gió</p>
                        <p>{weather?.windSpeed}km/h</p>
                    </div>
                    <div className="maxTemperature">
                        <p>Nhiệt độ tối đa</p>
                        <p><i className="bi bi-thermometer-high" />{weather?.maxTemperature}°C</p>
                    </div>
                    <div className="minTemperature">
                        <p>Nhiệt độ tối thiểu</p>
                        <p><i className="bi bi-thermometer" />{weather?.minTemperature}°C</p>
                    </div>
                </div>

            </div>
        </>
    )
}
export default MyWeather;