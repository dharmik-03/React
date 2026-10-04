import React from 'react'
import notfound from "../assets/not-found.png"

const Error = () => {
    return (
        <>



            <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }} >


                <img src={notfound} alt="Not found" style={{ width: "100px" }} />
                <h1 >Route not found</h1>
                <br />


                <h1 style={{ color: "red" }}>404</h1>
            </div>


        </>
    )
}

export default Error