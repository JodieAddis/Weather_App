import { useRef } from "react";

export const Input = (event) => {
    const country = useRef(null);

    const handleClickEvent = () => {
        const countryName = country.current.value;
        console.log(country.current.value);
    };

    return (
        <>
            <form
                action=""
                method="get"
                onSubmit={(event) => event.preventDefault()}
                //Prevent the refresh
            >
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter country "
                    ref={country}
                />
                <button onClick={(e) => handleClickEvent(e)}>Search</button>
            </form>
        </>
    );
};
