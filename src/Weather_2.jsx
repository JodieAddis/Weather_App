import React, { useState, useEffect, useContext } from "react";
import { GeoLocation } from "./Geo";
import down_arrow from "./assets/image/down_arrow.svg";
import up_arrow from "./assets/image/up_arrow.svg";
import { DarkModeContext } from "./DarkMode";
import { getDate } from "./getDate";

const MY_API_KEY = import.meta.env.VITE_MY_API_KEY;

export const Weather = ({ lat, lon }) => {
    const [weather, setWeather] = useState({
        isLoading: false,
        hasError: false,
    });
    const [data, setData] = useState();

    useEffect(() => {
        setWeather((prevWeather) => ({ ...prevWeather, isLoading: true }));
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${MY_API_KEY}&units=metric`
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

    const { isDarkMode } = useContext(DarkModeContext);

    const [currentDate, setCurrentDate] = useState(getDate());

    const [showDetails, setShowDetails] = useState(false);
    const handleClick = () => {
        setShowDetails(!showDetails);
    };

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
                    <section className=" flex flex-col text-white text-center font-julius">
                        <h2 className="text-4xl mx-8 mt-6 mb-2">{data.name}</h2>
                        <p className="text-white mb-5 text-sm">{currentDate}</p>
                        <div
                            className={`${
                                isDarkMode
                                    ? "bg-darkGrey bg-opacity-20 border-lightPurple border-solid border-2"
                                    : "bg-white bg-opacity-20 border-white border-solid border-2"
                            } self-center w-52 h-52 rounded-t-full rounded-b-full backdrop-blur-xl`}
                        >
                            <div className="flex justify-center flex-col content-around text-center my-auto">
                                <ul>
                                    <li className="my-4 text-sm">
                                        {data.weather[0].main}
                                    </li>
                                    <li className="self-center text-5xl semi-bold my-10 font-phudu">
                                        {Math.round(data.main.temp)}°
                                    </li>
                                    <li className="my-4 text-sm">
                                        Feels like{" "}
                                        {Math.round(data.main.feels_like)}°
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className="text-white font-julius">
                        <ul className="flex flex-row justify-around my-9 text-sm">
                            <li>
                                Min. temp. : {Math.round(data.main.temp_min)}°{" "}
                            </li>
                            <li>
                                Max. temp. : {Math.round(data.main.temp_max)}°
                            </li>
                        </ul>
                    </section>
                    <section
                        className={`${
                            isDarkMode
                                ? "bg-darkGrey border-lightPurple bg-opacity-10"
                                : "bg-white border-white bg-opacity-10"
                        } flex justify-center flex-col text-white pb-10  border-solid border-t-2 text-sm font-istok`}
                    >
                        <button onClick={handleClick} className="self-center">
                            <img
                                src={showDetails ? down_arrow : up_arrow}
                                alt="down arrow icon"
                                className=" py-4 w-8 invert"
                            />
                        </button>
                        {showDetails && (
                            <ul className="text-center">
                                <li>
                                    Sunrise: {unixConvert(data.sys.sunrise)}
                                </li>
                                <li>Sunset: {unixConvert(data.sys.sunset)}</li>
                                <li>Humidity: {data.main.humidity}%</li>
                                <li>Pressure: {data.main.pressure} Pa</li>
                                <li>Wind: {data.wind.speed} m/s</li>
                            </ul>
                        )}
                    </section>
                </>
            )}
        </>
    );
};
