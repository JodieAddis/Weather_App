import { useState, useEffect, useRef } from "react";
import config from "./config";
import { Weather } from "./Weather_2";
import list from "./assets/image/list.svg";
import close from "./assets/image/close.svg";

// export const GeoLocation = () => {
//     const [location, setLocation] = useState("");

//     const [cityName, setCityName] = useState(""); //State pour le nom
//     const [lat, setLat] = useState(null); //State pour la latitude
//     const [lon, setLon] = useState(null); //State pour la longitude

//     const disableSearch = location.trim() === ""; //locationSearch.trim() enlève les espaces vides au début et à la fin de la chaîne (nettoyage de la saisie)

//     const API_KEY = config.apiKey;

//     const fetchData = async () => {
//         try {
//             const locationApi = await fetch(
//                 `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
//             );
//             const locationData = await locationApi.json();
//             const locationCity = locationData[0];
//             console.log(locationCity);

//             setCityName(locationCity.name);
//             setLat(locationCity.lat);
//             setLon(locationCity.lon);

//             console.log(cityName, lat, lon);

//             setData(locationCity);
//         } catch {
//             // console.log("error");
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, [location]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         fetchData();
//     };

//     return (
//         <>
//             <Weather lat={lat} lon={lon} />
//             <form
//                 method="get"
//                 // onSubmit={(event) => event.preventDefault()}
//                 onSubmit={handleSubmit}
//                 className="flex-col justify-center"
//             >
//                 <input
//                     type="text"
//                     name=""
//                     id=""
//                     placeholder="Enter city "
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                 />
//                 <div>
//                     <button
//                         onClick={handleSubmit}
//                         disabled={disableSearch}
//                         className="text-center bg-white rounded py-2 px-3 m-5"
//                     >
//                         Search
//                     </button>
//                 </div>
//             </form>
//         </>
//     );
// };

export const GeoLocation = () => {
    const [location, setLocation] = useState(""); //Nom de la ville rentrée par l'utilisateur
    const [inputLocation, setInputLocation] = useState("");
    const [dataAPI, setDataAPI] = useState();
    const API_KEY = config.apiKey;

    const [hamburger, setHamburger] = useState(false);

    // useEffect(() => {
    //     fetch(
    //         `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
    //     )
    //         .then((response) => response.json()) //Stockage dans le json
    //         .then((result) => {
    //             setDataAPI(result);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, [location]);

    //Fonction permettant de récupérer la valeur de l'input + mise à jour du state correspondant
    const handleInputLocation = (e) => {
        setInputLocation(e.target.value);
    };

    // Fonction qui met à jour le state de Location lorsque le formulaire est soumis
    const handleSubmit = (e) => {
        e.preventDefault();
        setLocation(inputLocation);
        setInputLocation(""); //Ré-initialise la valeur
    };

    //Fonction pour affichage de la navBar au click de l'icone hamburger
    const openNav = () => {
        setHamburger(true);
    };

    return (
        <>
            <header className="flex justify-between bg-indigo-500 w-screen px-3.5 py-3.5 ">
                <div>
                    <button onClick={openNav}>
                        <img
                            src={list}
                            alt="hamburger icon"
                            className="invert w-8"
                        />
                    </button>
                    {hamburger && (
                        <nav className="navigation">
                            <div>
                                <button>
                                    <img src={close} alt="close icon" />
                                </button>
                            </div>
                            <div>
                                <form
                                    method="get"
                                    onSubmit={handleSubmit}
                                    className="flex flex-col"
                                >
                                    <input
                                        type="text"
                                        name="location"
                                        id="input_location"
                                        value={inputLocation}
                                        onChange={handleInputLocation}
                                    />
                                    <button
                                        type="submit"
                                        className="text-center text-white"
                                    >
                                        Search
                                    </button>
                                </form>
                            </div>
                        </nav>
                    )}
                </div>
                <div>
                    <h1 className="text-indigo-50 text-2xl font-semibold">
                        Logo
                    </h1>
                </div>
            </header>
            <main className="bg-gray-800">
                {location && (
                    <h1 className="text-white text-3xl text-center">
                        {location}
                    </h1>
                )}
            </main>
        </>
    );
};

/*
- Mise de l'input dans une NavBar : 
- Stockage de la dernière ville dans le localStorage : 

*/
