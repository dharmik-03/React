import { useState } from "react";

const ObjectUseState_06 = () => {

    const [user, setuser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (field, e) => {
        setuser((prev) => {
            return {
                ...prev,
                [field]: e.target.value,
            }
        })
    }

    return (
        <>

            <input type="text" value={user.name} placeholder="name" onChange={(e) => handleChange("name", e)} />

            <br />
            <br />

            <input type="email" value={user.email} placeholder="email" onChange={(e) => handleChange("email", e)} />

            <br />
            <br />

            <input type="password" value={user.password} placeholder="password" onChange={(e) => handleChange("password", e)} />

            <br />
            <br />

            <h1>name :- {user.name}</h1>
            <h1>email :- {user.email}</h1>
            <h1>password :- {user.password}</h1>


        </>
    )

}

export default ObjectUseState_06