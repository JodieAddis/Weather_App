import { useState } from "react";
import { GeoLocation } from "./Geo";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <GeoLocation />
        </>
    );
}

export default App;
