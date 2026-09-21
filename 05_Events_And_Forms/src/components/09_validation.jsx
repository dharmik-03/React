

import React, { useState } from 'react'

const Validation_08 = () => {

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [users, setUsers] = useState([])
    const [error, setError] = useState([])

    const validation = () => {
        const newErrors = {}

        if (input.name === "") {
            newErrors.name = "name is required"
        }

        if (input.email === "") {
            newErrors.email = "email is required"
        }

        if (input.password === "") {
            newErrors.password = "password is required"
        }

        if (input.password.length < 6) {
            newErrors.password = "password  must be atleast 6 character"
        }

        return newErrors

    }


    const handleChange = (field, e) => {
        setInput((prev) => {
            return {
                ...prev,
                [field]: e.target.value
            }
        })
    }

    const handleSubmit=(e)=>{
        
    }

    return (
        <div>Validation</div>
    )
}

export default Validation_08