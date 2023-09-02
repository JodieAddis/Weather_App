import { useState, useEffect, useRef, useContext } from "react";
import { Weather } from "./Weather_2";
import { DarkModeContext } from "./DarkMode";
import { LightSwitch } from "./LightSwitch";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { IconContext } from "react-icons";
import config from "./config";

import list from "./assets/image/list.svg";
import close from "./assets/image/close.svg";
import search from "./assets/image/search.svg";
import dayCity from "./assets/image/jour.png";
import nightCity from "./assets/image/nuit.png";

export const GeoLocation = () => {
    const [location, setLocation] = useState("");
    const [inputLocation, setInputLocation] = useState(""); //Récupération de l'input

    const [openNav, setOpenNav] = useState(false); //Etat ouverture de la navBar

    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    const [infoDisplay, setInfoDisplay] = useState(false);

    const API_KEY = config.apiKey;

    const handleInputLocation = (e) => {
        setInputLocation(e.target.value);
    };

    //Essai pour la création d'un input autocomplete
    const [results, setResults] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocation(inputLocation);
        closeNavBar(); //Ferme la navbar après le submit
    };

    //Fonction qui controle l'ouverture et la fermeture de la navbar
    const toggleNavBar = () => {
        setOpenNav(!openNav);
    };

    const closeNavBar = () => {
        setOpenNav(false); //On remet sur false pour fermer la navbar
    };

    //Appel du contexte DarkModeApp pour appliquer le darkMode au contenu
    const { isDarkMode } = useContext(DarkModeContext);

    useEffect(() => {
        if (location) {
            // Ajout de la condition pour éviter les requêtes vides
            fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
            )
                .then((response) => response.json())
                .then((result) => {
                    const resultAPI = result[0];
                    const latitude = resultAPI.lat;
                    const longitude = resultAPI.lon;

                    // console.log(result[0]);
                    // console.log(latitude);
                    // console.log(longitude);

                    setLat(latitude);
                    setLon(longitude);
                    setInputLocation("");
                    setInfoDisplay(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [location, API_KEY]);

    return (
        <div
            className={`${
                isDarkMode ? "bg-darkBackground" : "bg-lightBackground"
            } min-h-screen flex flex-col`}
        >
            <header className="w-screen px-3.5 pt-3.5 border-white border-solid border-b-2">
                <div>
                    <div className="flex justify-between">
                        <button onClick={toggleNavBar}>
                            <img
                                src={openNav ? close : list}
                                alt="menu icon"
                                className="invert w-6 "
                            />
                        </button>
                        <h1 className="text-indigo-50 text-2xl font-semibold">
                            Logo
                        </h1>
                    </div>
                    {openNav && (
                        <nav
                            className={`${
                                isDarkMode
                                    ? "bg-darkBackground"
                                    : "bg-lightBackground"
                            } min-h-screen w-full absolute z-10 -ml-3.5`}
                        >
                            <h2 className="text-white text-center text-2xl font-julius mt-32 mb-12">
                                Choose a city
                            </h2>
                            <div className="flex justify-center text-center overflow-y-auto">
                                <form
                                    method="get"
                                    onSubmit={handleSubmit}
                                    className="flex justify-center"
                                >
                                    <input
                                        type="text"
                                        name="location"
                                        id="input_location"
                                        placeholder="City name"
                                        className="text-md italic border-darkOrange border-solid border-3"
                                        value={inputLocation}
                                        onChange={handleInputLocation}
                                    />
                                    <button
                                        type="submit"
                                        className=" flex self-start w-12 invert ml-3"
                                    >
                                        <img src={search} alt="search icon" />
                                    </button>
                                </form>
                            </div>
                            {/* <img src={dayCity} alt="" className="mt-20" /> */}
                        </nav>
                    )}
                </div>
                <div>
                    <img
                        src={isDarkMode ? nightCity : dayCity}
                        alt="city contour"
                        className="flex w-52 mx-auto"
                    />
                </div>
            </header>
            <main className="h-full my-auto">
                {infoDisplay ? (
                    <section className="flex justify-end mx-4 mt-5 pb-5">
                        <LightSwitch />
                    </section>
                ) : (
                    ""
                )}
                <section className="my-auto">
                    {infoDisplay ? (
                        ""
                    ) : (
                        <p className="text-white text-center text-xl font-semibold font-julius">
                            No city has been chosen.
                        </p>
                    )}
                </section>
                <section>
                    {location && (
                        <>
                            <Weather lat={lat} lon={lon} />
                        </>
                    )}
                </section>
            </main>
            <footer
                className={`${
                    isDarkMode ? "bg-darkGrey" : "bg-white"
                } text-white bg-opacity-10 shrink-0`}
            >
                {/* <hr className="mx-14 border-white border-solid border-1" /> */}
                <p className="text-xs text-center py-4">
                    Weather App coded by{" "}
                    <a href="https://github.com/JodieAddis">Jodie Addis</a>
                </p>
                <section className="flex flex-row justify-center pb-7">
                    <a
                        href="https://www.linkedin.com/in/jodieaddis/"
                        className="mr-3"
                        target="_blank"
                    >
                        <IconContext.Provider value={{ size: "1.5em" }}>
                            <BsLinkedin />
                        </IconContext.Provider>
                    </a>
                    <a href="https://github.com/JodieAddis" target="_blank">
                        <IconContext.Provider value={{ size: "1.5em" }}>
                            <BsGithub />
                        </IconContext.Provider>
                    </a>
                </section>
            </footer>
        </div>
    );
};
