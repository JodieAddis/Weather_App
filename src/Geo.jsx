import { useState, useEffect, useRef } from "react";
import config from "./config";
import { Weather } from "./Weather_2";
import list from "./assets/image/list.svg";
import close from "./assets/image/close.svg";
import search from "./assets/image/search.svg";
import sunshine from "./assets/image/sunshine.jpg";

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
        <>
            <header className=" bg-indigo-500 w-screen px-3.5 py-3.5 rounded-b-xl absolute z-10">
                <div>
                    <div className="flex justify-between">
                        <button onClick={toggleNavBar}>
                            <img
                                src={openNav ? close : list}
                                alt="menu icon"
                                className="invert w-4"
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
                                        placeholder="Choose a city"
                                        className="text-md"
                                        value={inputLocation}
                                        onChange={handleInputLocation}
                                    />
                                    <button
                                        type="submit"
                                        className=" flex self-center w-12 invert ml-3"
                                    >
                                        <img src={search} alt="search icon" />
                                    </button>
                                </form>
                            </div>
                        </nav>
                    )}
                </div>
            </header>

            <main className="bg-gray-800 py-20">
                {location && (
                    <>
                        <Weather lat={lat} lon={lon} />
                    </>
                )}
            </main>
        </>
    );
};

/*
- Mise de l'input dans une NavBar : Ok
- Stockage de la dernière ville dans le localStorage : 

*/
