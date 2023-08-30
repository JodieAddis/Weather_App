import React from "react";
// import { createContext } from "vm";
import { createContext } from "react";
import { useState } from "react";

//1. Création du contexte

export const DarkModeContext = createContext();

//2. Attribution des valeurs au contexte
export const DarkMode = (props) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    //Fonction pour basculer vers darkmode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div>
            <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
                {props.children}
            </DarkModeContext.Provider>
        </div>
    );
};
