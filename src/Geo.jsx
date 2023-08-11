import { useState, useEffect } from "react";
// import { apiKey } from "./apiKey";

export const GeoLocation = () => {
    const [location, setLocation] = useState("");
    const [data, setData] = useState([]);

    const [cityName, setCityName] = useState(""); //State pour le nom
    const [lat, setLat] = useState(""); //State pour la latitude
    const [lon, setLon] = useState(""); //State pour la longitude

    const disableSearch = location.trim() === ""; //locationSearch.trim() enlève les espaces vides au début et à la fin de la chaîne (nettoyage de la saisie)

    const apiKey = "5cb7fc28972cc41b9f08bb663b766ae2";
    const fetchData = async () => {
        try {
            const locationApi = await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`
            );
            const locationData = await locationApi.json();
            const locationCity = locationData[0];

            // Stocker les données
            // const cityName = locationCity.name;
            // const lat = locationCity.lat;
            // const lon = locationCity.lon;

            setCityName(locationCity.name);
            setLat(locationCity.lat);
            setLon(locationCity.lon);

            console.log(cityName, lat, lon);

            // setData(await locationCity.json());
            setData(locationCity);
            console.log(data);
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
            <form
                method="get"
                onSubmit={(event) => event.preventDefault()}
                //Prevent the refresh
            >
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter country "
                    value={location}
                    onChange={(e) => setLocation(e.target.value)} //A chaque changement détecté, le setLocation mis à jour avec la valeur de l'input ciblée
                />
                <button onClick={handleSearch} disabled={disableSearch}>
                    Search
                </button>
            </form>
            <div>
                <p>{cityName}</p>
                <p>{lat}</p>
                <p>{lon}</p>
            </div>
        </>
    );
};
