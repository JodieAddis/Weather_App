import { useState, useEffect, useRef, useContext } from "react";
import { Weather } from "./Weather";
import { DarkModeContext } from "./DarkMode";
import { LightSwitch } from "./LightSwitch";
import { BsLinkedin, BsGithub, BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";
import { MdClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

import dayCity from "./assets/image/jour.png";
import nightCity from "./assets/image/nuit.png";
import Logo from "./assets/image/Logo.png";

const MY_API_KEY = import.meta.env.VITE_MY_API_KEY;

export const GeoLocation = () => {
    const [location, setLocation] = useState("");
    const [inputLocation, setInputLocation] = useState("");

    const [openNav, setOpenNav] = useState(false);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    const [infoDisplay, setInfoDisplay] = useState(false);

    const handleInputLocation = (e) => {
        setInputLocation(e.target.value);
    };

    const [results, setResults] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocation(inputLocation);
        closeNavBar();
    };

    const toggleNavBar = () => {
        setOpenNav(!openNav);
    };

    const closeNavBar = () => {
        setOpenNav(false);
    };

    const { isDarkMode } = useContext(DarkModeContext);

    useEffect(() => {
        if (location) {
            fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${MY_API_KEY}`
            )
                .then((response) => response.json())
                .then((result) => {
                    const resultAPI = result[0];
                    const latitude = resultAPI.lat;
                    const longitude = resultAPI.lon;

                    setLat(latitude);
                    setLon(longitude);
                    setInputLocation("");
                    setInfoDisplay(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [location]);

    return (
        <div
            className={`${
                isDarkMode ? "bg-darkBackground" : "bg-lightBackground"
            } min-h-screen w-screen flex flex-col`}
        >
            <header className="w-screen px-3.5 pt-3.5 border-white border-solid border-b-2">
                <div>
                    <div className="flex justify-between sm:pb-6">
                        <button onClick={toggleNavBar}>
                            {openNav ? (
                                <IconContext.Provider
                                    value={{
                                        style: { filter: "invert(1)" },
                                        size: "1.5em",
                                    }}
                                >
                                    <MdClose />
                                </IconContext.Provider>
                            ) : (
                                <IconContext.Provider
                                    value={{
                                        style: { filter: "invert(1)" },
                                        size: "1.5em",
                                    }}
                                >
                                    <RxHamburgerMenu />
                                </IconContext.Provider>
                            )}
                        </button>
                        <img
                            src={Logo}
                            alt="Logo of the website"
                            className="w-12 sm:mr-4"
                        />
                    </div>
                    {openNav && (
                        <nav
                            className={`${
                                isDarkMode
                                    ? "bg-darkBackground"
                                    : "bg-lightBackground"
                            } min-h-screen w-full absolute z-10 -ml-3.5 py-40 border-white border-solide border-2`}
                        >
                            <h2 className="text-white text-center text-2xl sm:text-3xl font-julius mt-32 mb-12">
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
                                        className="text-md sm:text-sm italic border-darkOrange border-solid border-3"
                                        value={inputLocation}
                                        onChange={handleInputLocation}
                                    />
                                    <button
                                        type="submit"
                                        className=" flex self-center w-12 ml-3 invert"
                                    >
                                        <BsSearch />
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
                        className="flex w-52 sm:w-80 mx-auto"
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
                } text-white bg-opacity-10 shrink-0 sm:pt-12`}
            >
                <p className="text-xs text-center py-4">
                    Weather App coded by{" "}
                    <a href="https://github.com/JodieAddis">Jodie Addis</a>
                </p>
                <section className="flex flex-row justify-center pb-7 sm:pb-0 sm:mb-12">
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
