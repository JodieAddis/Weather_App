import { useState } from "react";
import { GeoLocation } from "./Geo";
import { Weather } from "./Weather";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <GeoLocation />
            <Weather />
        </>
    );
}

export default App;
