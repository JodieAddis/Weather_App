import { createContext, useState } from "react";
import { GeoLocation } from "./Geo";
import { Weather } from "./Weather_2";
import list from "./assets/image/list.svg";
import "./App.css";

function App() {
    return (
        <body className="bg-gray-800">
            <header className="flex justify-between bg-indigo-500 w-screen px-3.5 py-3.5 ">
                <img src={list} alt="hamburger icon" className="invert w-8" />
                <h1 className="text-indigo-50 text-2xl font-semibold">Logo</h1>
            </header>
            <main>
                <GeoLocation />
            </main>
        </body>
    );
}

export default App;
