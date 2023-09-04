import React, { useContext } from "react";
import { DarkModeContext } from "./DarkMode";
import { IconContext } from "react-icons";
import { WiDaySunny, WiMoonWaningCrescent3 } from "react-icons/wi";

export const LightSwitch = () => {
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

    const handleClick = () => {
        toggleDarkMode();
    };

    return (
        <button
            onClick={handleClick}
            className="flex justify-center invert w-11 border-black border-solid border-2 rounded-md py-1 cursor-pointer"
        >
            {isDarkMode ? <WiMoonWaningCrescent3 /> : <WiDaySunny />}
        </button>
    );
};
