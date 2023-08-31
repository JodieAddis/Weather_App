/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                orange: "#FF8832",
                darkOrange: "#EB6504",
                rose: "#E460CF",
                darkPurple: "#963CA4",
                lightPurple: "#EC26CC",
                darkGrey: "#282329",
            },
            fontFamily: {
                phudu: ["Phudu", "sans"],
            },
            backgroundImage: (theme) => ({
                lightBackground: `linear-gradient(to top right, ${theme(
                    "colors.rose"
                )}, ${theme("colors.orange")})`,
                darkBackground: `linear-gradient(to top right, ${theme(
                    "colors.darkPurple"
                )}, ${theme("colors.darkGrey")})`,
            }),
            fontFamily: {
                julius: ["Julius Sans One", ...defaultTheme.fontFamily.sans],
                istok: ["Istok Web", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
