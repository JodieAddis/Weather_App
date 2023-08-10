import { useState, useEffect, useRef } from "react";
// import { Input } from "./components/input/Input";

export const GeoLocation = () => {
    const country = useRef(null);
    const [geoData, setGeoData] = useState([]);

    const handleClickEvent = () => {
        const countryName = country.current.value;
        console.log(country.current.value);
    };

    const fetchData = async () => {
        try {
            const location = await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q={Brussels}&limit=1&appid=5cb7fc28972cc41b9f08bb663b766ae2`
            );
            setGeoData(await location.json());
            console.log(geoData);
        } catch {
            console.log("error");
        }
    };

    useEffect(() => {
        fetchData();
    }, [setGeoData]);

    return (
        <>
            <form
                action=""
                method="get"
                onSubmit={(event) => event.preventDefault()}
                //Prevent the refresh
            >
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter country "
                    ref={country}
                />
                <button onClick={(e) => handleClickEvent(e)}>Search</button>
            </form>
        </>
    );
};
