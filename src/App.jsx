import { createContext, useState } from "react";
import { GeoLocation } from "./Geo";
import { Weather } from "./Weather";
import { DarkMode } from "./DarkMode";

function App() {
    return (
        <>
            <DarkMode>
                <GeoLocation />
            </DarkMode>
        </>
    );
}

export default App;
