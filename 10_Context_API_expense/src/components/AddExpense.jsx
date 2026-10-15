import React, { useState } from 'react'

const AddExpense = () => {


    const [input, setInput] = useState({
        title: "",
        description: "",
        category: "",
        amount: "0",
        date: "",
        type: ""
    })

    const handleChange = (field, e) => {
        setInput((prev) => {
            return {
                ...prev,
                [field]: e.target.value

            }
        })
    }

    const handleSubmit = (e) => {

        e.preventDefault()
        console.log(input)

    }

    return (
        <>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='enter title' value={input.title} onChange={(e) => handleChange("title", e)} />
                <br />
                <input type="text" placeholder='enter Description' value={input.description} onChange={(e) => handleChange("description", e)} />
                <br />
                <input type="text" placeholder='enter category' value={input.category} onChange={(e) => handleChange("category", e)} />
                <br />
                <input type="number" placeholder='enter amount' value={input.amount} onChange={(e) => handleChange("amount", e)} />
                <br />
                <input type="Date" placeholder='enter date' value={input.date} onChange={(e) => handleChange("date", e)} />
                <br />
                <input type="text" placeholder='enter type' value={input.type} onChange={(e) => handleChange("type", e)} />
                <br />

                <button type='submit'>Add</button>
            </form>

        </>
    )
}

export default AddExpense