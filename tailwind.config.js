/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                saumon: "#f88e55",
                darkOrange: "#c96324",
                mauve: "#c69d96",
            },
            fontFamily: {
                phudu: ["Phudu", "sans"],
            },
        },
    },
    plugins: [],
};
