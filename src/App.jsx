import { createContext, useState } from "react";
import { GeoLocation } from "./Geo";
import { Weather } from "./Weather_2";
import "./App.css";

function App() {
    return (
        <>
            <GeoLocation />
            <Weather />
        </>
    );
}

export default App;
