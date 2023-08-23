import { useState, useEffect } from "react";
import config from "./config";
import { Weather } from "./Weather_2";

export const GeoLocation = () => {
    const [location, setLocation] = useState("");
    const [data, setData] = useState([]);

    const [cityName, setCityName] = useState(""); //State pour le nom
    const [lat, setLat] = useState(null); //State pour la latitude
    const [lon, setLon] = useState(null); //State pour la longitude

    const disableSearch = location.trim() === ""; //locationSearch.trim() enlève les espaces vides au début et à la fin de la chaîne (nettoyage de la saisie)

    const apiKey = config.apiKey;
    const fetchData = async () => {
        try {
            const locationApi = await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q={Rome}&limit=1&appid=5cb7fc28972cc41b9f08bb663b766ae2`
            );
            const locationData = await locationApi.json();
            const locationCity = locationData[0];
            console.log(locationCity);

            setCityName(locationCity.name);
            setLat(locationCity.lat);
            setLon(locationCity.lon);

            console.log(cityName, lat, lon);

            setData(locationCity);
        } catch {
            console.log("error");
        }
    };

    const handleSearch = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, [location]);

    return (
        <>
            <Weather cityName={cityName} lat={lat} lon={lon} />
            <form
                method="get"
                onSubmit={(event) => event.preventDefault()}
                //Prevent the refresh
            >
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter city "
                    value={location}
                    onChange={(e) => setLocation(e.target.value)} //A chaque changement détecté, le setLocation mis à jour avec la valeur de l'input ciblée
                />
                <button
                    onClick={handleSearch}
                    disabled={disableSearch}
                    className="submit_location"
                >
                    Search
                </button>
            </form>
        </>
    );
};
