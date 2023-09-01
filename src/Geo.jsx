import { useState, useEffect, useRef, useContext } from "react";
import config from "./config";
import { Weather } from "./Weather_2";
import list from "./assets/image/list.svg";
import close from "./assets/image/close.svg";
import search from "./assets/image/search.svg";
import { DarkModeContext } from "./DarkMode";
import { LightSwitch } from "./LightSwitch";
import dayCity from "./assets/image/jour.png";
import nightCity from "./assets/image/nuit.png";
import { BsLinkedin, BsGithub } from "react-icons/bs";

export const GeoLocation = () => {
    const [location, setLocation] = useState("");
    const [inputLocation, setInputLocation] = useState(""); //Récupération de l'input

    const [openNav, setOpenNav] = useState(false); //Etat ouverture de la navBar

    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

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
            } grid grid-rows-autoGrid`}
        >
            <header className="w-screen px-3.5 pt-3.5 z-10 border-white border-solid border-b-2">
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
                        <nav className="navigation flex justify-center max-w-screen-xl my-10">
                            <div className="text-center">
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
            <main>
                <section className="flex justify-end mx-4 mt-5 pb-5">
                    <LightSwitch />
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
                } text-white bg-opacity-10`}
            >
                <hr className="mx-14 border-white border-solid border-1" />
                <p className="text-xs text-center py-4">
                    Weather App coded by{" "}
                    <a href="https://github.com/JodieAddis">Jodie Addis</a>
                </p>
                <a href="https://www.linkedin.com/in/jodieaddis/">
                    <img src={<BsLinkedin />} alt="LinkedIn icon" />
                </a>
                <a href="https://github.com/JodieAddis">
                    <img src={<BsGithub />} alt="Github icon" />
                </a>
            </footer>
        </div>
    );
};

/*
- Mise de l'input dans une NavBar : Ok
- Stockage de la dernière ville dans le localStorage : 
- Application d'un darkmode : Ok 

*/
