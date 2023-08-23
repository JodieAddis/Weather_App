import React, { useState, useEffect } from "react";
import { GeoLocation } from "./Geo";
import config from "./config";

const API_KEY = config.apiKey;

export const Weather = (props) => {
    const [weather, setWeather] = useState({
        isLoading: false,
        hasError: false,
        data: undefined,
    });

    // const latitude = props.lat;
    // const longitude = props.lon;

    useEffect(() => {
        setWeather({ ...weather, isLoading: true });
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=41.8933&lon=12.4829&appid=${API_KEY}&units=metric`
        )
            .then((response) => response.json())
            .then((result) => {
                setWeather({
                    isLoading: false,
                    hasError: false,
                    data: result,
                });
            })
            .catch((error) => {
                console.error(error);
                setWeather({
                    isLoading: false,
                    hasError: true,
                    data: undefined,
                });
            });
    }, []); //Crochet vide pour exécuter une seule

    return (
        <>
            {weather.isLoading && <p>Chargement en cours</p>}
            {weather.hasError && <p>Une erreur s'est produite</p>}
            {weather.data && (
                <>
                    <h1>Current Weather</h1>
                    <div>
                        <li>
                            `
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                                alt="Icon of the current weather"
                            />
                            <p>{weather.data.weather[0].main}</p>
                            <p>{weather.data.weather[0].description}</p>
                            <p>{weather.data.main.temp} °C</p>
                            <p>{weather.data.main.pressure} Pa</p>
                            <p>{weather.data.main.humidity}%</p>
                        </li>
                    </div>
                </>
            )}
        </>
    );
};
