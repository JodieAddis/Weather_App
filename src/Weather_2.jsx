import React, { useState, useEffect } from "react";
// import { GeoLocation } from "./Geo";
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
                    <section className=" flex flex-col text-white">
                        <h2 className="text-center text-4xl font-bold m-8">
                            {data.name}
                        </h2>
                        <div className=" self-center bg-blue-500 w-56 h-56 rounded-t-full rounded-b-full">
                            <div className="flex justify-center flex-col text-center my-auto">
                                <p className="">{data.weather[0].main}</p>
                                <p className="flex self-center text-6xl font-bold">
                                    {data.main.temp}°
                                </p>
                                <div>
                                    {/* <img
                                        className="min-w-min self-center"
                                        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                                        alt="weather icon"
                                    /> */}
                                </div>
                                <p className="">
                                    Feels like {data.main.feels_like}°
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="text-white">
                        <ul className="flex flex-row justify-around my-9">
                            <li>Min. temp.: {data.main.temp_min}° </li>
                            <li>Max. temp.: {data.main.temp_max}°</li>
                        </ul>
                    </section>
                    <section className="weather__details flex justify-center flex-wrap text-white">
                        <ul className="text-center">
                            <li>Sunrise {data.sys.sunrise}</li>
                            <li>Sunset {data.sys.sunset}</li>
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
