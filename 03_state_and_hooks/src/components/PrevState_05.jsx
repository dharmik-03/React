import { useState } from "react";

const PrevState_05 = () => {

    const [input, setInput] = useState("")

    const [user, setUser] = useState([])

    const handleSubmit = (e) => {

        e.preventDefault()

        setUser((prev) => [...prev, input])
    }

    return (
        <>

            <form onSubmit={handleSubmit}>

                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />

                <button type="submit">add user</button>

            </form>

            <ul>
                {user.map((u) => {
                    return <li>{u}</li>
                })}
            </ul>

        </>
    )

}

export default PrevState_05