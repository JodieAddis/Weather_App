import { useState } from "react";
// import { Input } from "./components/input/Input";
import { GeoLocation } from "./Geo";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            {/* <Input /> */}
            <GeoLocation />
        </>
    );
}

export default App;
