import React, { useState, useEffect } from "react";
import { GeoLocation } from "./Geo";
import config from "./config";

const API_KEY = config.apiKey;

export const Weather = ({ lat, lon }) => {
    const [weather, setWeather] = useState({
        isLoading: false,
        hasError: false,
    });
    const [data, setData] = useState();

    useEffect(() => {
        setWeather({ ...weather, isLoading: true });
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
            .then((response) => response.json())
            .then((result) => {
                setData(result);
                console.log(result);
                setWeather({ ...weather, isLoading: false });
            })
            .catch((error) => {
                console.error(error);
                setWeather({
                    isLoading: false,
                    hasError: true,
                });
            });
    }, [lat, lon]);

    return (
        <>
            {weather.isLoading && <p>Chargement en cours</p>}
            {weather.hasError && <p>Une erreur s'est produite</p>}
            {data && data.weather && data.weather.length > 0 && (
                <>
                    <section>
                        <h1>{data.name}</h1>
                        <h2>{data.main.temp}°C</h2>
                        <img
                            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                            alt="weather icon"
                        />
                        <p>{data.weather[0].main}</p>
                        <p>Feels like {data.main.feels_like}°C</p>
                    </section>
                    <section>
                        <ul>
                            <li>Humidity: {data.main.humidity}%</li>
                            <li>Pressure: {data.main.pressure} Pa</li>
                            <li>Wind: {data.wind.speed} m/s</li>
                        </ul>
                    </section>
                </>
            )}
        </>
    );
};
