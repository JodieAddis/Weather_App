import React, { useState, useEffect } from "react";
import { GeoLocation } from "./Geo";
import config from "./config";

const API_KEY = config.apiKey;

const Weather = (props) => {
    const [weather, setWeather] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);
    //Pour la variable d'état, on définit 3 éléments dans un objet qui sont définis avec des valeurs initiales
    // console.log(props);

    //Il n'est pas possible d'injecter les props directement dans l'URL de l'API. Il faut alors les stocker dans des variables :
    const latitude = props.lat;
    const longitude = props.lon;

    // const fetchWeather = async () => {
    //     setLoading(true);
    //     setError(false);
    //     try {
    //         const weatherURL = await fetch(
    //             `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    //         );
    //         const weatherApi = await weatherURL.json();
    //         const weatherData = await weatherApi.list[0].main;
    //         setWeather(weatherData);
    //         console.log(weatherData);
    //         console.log(weatherData.temp);
    //     } catch {
    //         setLoading(false);
    //         setError(true);
    //     }
    // };

    // useEffect(() => {
    //     fetchWeather();
    // }, []); //Le 2e paramètre [] permet que l'appel à fetchWeather() se fait une seule fois après le rendu initial, plutôt que d'être déclenché à chaque changement dans weather.

    useEffect(() => {
        fetch();
    });

    return (
        <>
            {/* Message qui s'affiche en cas d'échec de chargement des données de l'API, type "court-circuit" */}
            {hasError && <p>Something went wrong.</p>}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {/* <h1>{cityName}</h1> */}
                    <div className="show_data">
                        {/* <p>Temperature: {weatherData.temp}°C</p>
                        <p>Humidity: {weatherData.humidity}%</p>
                        <p>Pressure: {weatherData.pressure}Pa</p> */}
                    </div>
                    <div>
                        <p>{latitude}</p>
                        <p>{longitude}</p>
                    </div>
                </>
            )}
        </>
    );
};
