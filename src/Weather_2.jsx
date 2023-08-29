import React, { useState, useEffect } from "react";
import { GeoLocation } from "./Geo";
import config from "./config";
import down_arrow from "./assets/image/down_arrow.svg";
import up_arrow from "./assets/image/up_arrow.svg";

const API_KEY = config.apiKey;

export const Weather = ({ lat, lon }) => {
    const [weather, setWeather] = useState({
        isLoading: false,
        hasError: false,
    });
    const [data, setData] = useState();

    useEffect(() => {
        setWeather((prevWeather) => ({ ...prevWeather, isLoading: true }));
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
            .then((response) => response.json())
            .then((result) => {
                setData(result);
                console.log(result);
                setWeather((prevWeather) => ({
                    ...prevWeather,
                    isLoading: false,
                }));
            })
            .catch((error) => {
                console.error(error);
                setWeather({
                    isLoading: false,
                    hasError: true,
                });
            });
    }, [lat, lon]);

    const unixConvert = (unix) => {
        const date = new Date(unix * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        let sunHour = hours + "h" + minutes;
        return sunHour;
    };

    console.log(unixConvert(1693283540));

    return (
        <>
            {weather.isLoading && (
                <div className="flex justify-center">
                    <p className="text-center text-white">
                        Chargement en cours
                    </p>
                    <img src="" alt="" />
                </div>
            )}
            {weather.hasError && <p>Une erreur s'est produite</p>}
            {data && data.weather && data.weather.length > 0 && (
                <>
                    <section className=" flex flex-col text-white">
                        <h2 className="text-center text-3xl font-bold m-8 font-phudu">
                            {data.name}
                        </h2>
                        <div className=" self-center bg-blue-500 w-56 h-56 rounded-t-full rounded-b-full backdrop-blur-xl">
                            <div className="flex justify-center flex-col content-around text-center my-auto">
                                <ul>
                                    <li className="my-4">
                                        {data.weather[0].main}
                                    </li>
                                    <li className="self-center text-5xl font-bold my-10">
                                        {Math.round(data.main.temp)}°
                                    </li>
                                    <li className="my-4">
                                        Feels like{" "}
                                        {Math.round(data.main.feels_like)}°
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className="text-white">
                        <ul className="flex flex-row justify-around my-9">
                            <li>
                                Min. temp.: {Math.round(data.main.temp_min)}°{" "}
                            </li>
                            <li>
                                Max. temp.: {Math.round(data.main.temp_max)}°
                            </li>
                        </ul>
                    </section>
                    <section className="weather__details flex justify-center flex-col text-white bg-blue-500 rounded-t-2xl pb-10">
                        <img
                            src={up_arrow}
                            alt="down arrow icon"
                            className="self-center py-4 w-6 invert"
                        />
                        <ul className="text-center">
                            {/* <li>Sunrise {data.sys.sunrise}</li> */}
                            <li>Sunrise {unixConvert(data.sys.sunrise)}</li>
                            {/* <li>Sunset {data.sys.sunset}</li> */}
                            <li>Sunset {unixConvert(data.sys.sunset)}</li>
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

// let unix_timestamp = 1549312452
// // Create a new JavaScript Date object based on the timestamp
// // multiplied by 1000 so that the argument is in milliseconds, not seconds.
// var date = new Date(unix_timestamp * 1000);
// // Hours part from the timestamp
// var hours = date.getHours();
// // Minutes part from the timestamp
// var minutes = "0" + date.getMinutes();
// // Seconds part from the timestamp
// var seconds = "0" + date.getSeconds();

// // Will display time in 10:30:23 format
// var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

// console.log(formattedTime);
