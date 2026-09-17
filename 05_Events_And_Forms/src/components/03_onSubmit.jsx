import React, { useState } from 'react'

const OnSubmit = () => {

    const [name, setName] = useState("")

    const showAlert = (e) => {
        e.preventDefault()
        alert(`hi ${name}`)
    }

    return (
        <>

            <form onSubmit={showAlert}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <button type='submit'>submit</button>
            </form>
        </>
    )
}

export default OnSubmit