import { createContext, useState } from "react";
import { GeoLocation } from "./Geo";
import { Weather } from "./Weather_2";
import "./App.css";

function App() {
    return (
        <body className="bg-gray-800">
            <header className="bg-indigo-500 w-screen ">
                <h1 className="text-indigo-50 text-4xl font-bold py-9 text-center">
                    Weather App
                </h1>
            </header>
            <main>
                <GeoLocation />
            </main>
        </body>
    );
}

export default App;
