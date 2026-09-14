import { useState } from "react";

const State_03 = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }


    return (
        <>
            <h3>Enter Name</h3>
            <input type="text" value={name} onChange={handleName} />

            <br />
            <br />


            <h3>Enter Email</h3>
            <input type="email" value={email} onChange={handleEmail} />

            <br />
            <br />

            <h3>Enter password</h3>
            <input type="password" value={password} onChange={handlePassword} />

            <br />
            <br />

            <h1>Name :-{name}</h1>

            <br />
            <br />

            <h1>Email :-{email}</h1>

            <br />
            <br />

            <h1>Password :-{password}</h1>

            <br />
            <br />



        </>
    )

}

export default State_03