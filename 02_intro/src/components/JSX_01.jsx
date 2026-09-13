import React from "react";

const JSX = () => {

    //without JSX

    const withOutJSX = React.createElement("h1", null, "without JSX")


    //with JSX


    const withJSX = <h1>with JSX</h1>;

    return (
        <>
            <h1>{withOutJSX} {withJSX}</h1>

        </>
    )
}

export default JSX