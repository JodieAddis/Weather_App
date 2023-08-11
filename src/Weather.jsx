import React, { useState, useEffect } from "react";
import { GeoLocation } from "./Geo";
import config from "./config";

const apiKey = config.apiKey;

export const Weather = ({ cityName, lat, lon }) => {
    const [weather, setWeather] = useState([]);

    const fetchWeather = async () => {
        try {
            const weatherURL = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
            );
            const weatherData = await weatherURL.json();
            const weahterList = weatherData.list;
            const mainData = weahterList[0].main;

            setWeather(mainData);
            // console.log(weatherData);
            // console.log(weahterList);
            // console.log(mainData);
        } catch {
            console.log("error");
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []); //Le 2e paramètre [] permet que l'appel à fetchWeather() se fait une seule fois après le rendu initial, plutôt que d'être déclenché à chaque changement dans weather.

    return (
        <>
            <h1>{cityName}</h1>
            <div>
                <span>{weather.temp}</span>
                <br></br>
                <span>{weather.pressure}</span>
                <br></br>
                <span>{weather.humidity}</span>
            </div>
        </>
    );
};
