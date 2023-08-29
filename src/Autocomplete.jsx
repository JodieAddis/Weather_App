import React from "react";
import { useState } from "react";

const Autocomplete = () => {
    const [input, setInput] = useState("");
    const [geoData, setGeoData] = useState();

    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                const results = result.filter((user) => {
                    return (
                        user &&
                        user.name &&
                        user.name.toLowerCase().includes(value)
                    );
                });
                console.log(results);
            });
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };
    return (
        <>
            <input
                type="text"
                placeholder="Type to search"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </>
    );
};
