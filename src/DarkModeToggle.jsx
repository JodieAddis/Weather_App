import React from "react";
import Toggle from "react-toggle"; //Bibliothèque permettant d'afficher l'élément de changement de mode
import { useState } from "react";

export const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(true);

    return (
        <Toggle
            checked={isDark}
            onChange={({ target }) => setIsDark(target.checked)}
            icons={{ checked: "🌙", unchecked: "🔆" }}
            aria-label="Dark Mode Toggle"
        />
    );
};
