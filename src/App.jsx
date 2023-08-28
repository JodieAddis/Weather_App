import { createContext, useState } from "react";
import { GeoLocation } from "./Geo";
import { Weather } from "./Weather_2";
import list from "./assets/image/list.svg";
import "./App.css";

function App() {
    return (
        <>
            <GeoLocation />
        </>
    );
}

export default App;
