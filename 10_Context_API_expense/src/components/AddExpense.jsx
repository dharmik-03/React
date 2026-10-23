import React, { useContext, useEffect, useState } from 'react'
import { ExpenceContext } from '../context/contexts'
const AddExpense = () => {

    const { handleAdd ,editVal} = useContext(ExpenceContext)


    const [input, setInput] = useState({
        title: "",
        description: "",
        category: "",
        amount: "0",
        date: "",
        type: ""
    })

    useEffect(()=>{
        editVal?setInput(editVal):null
    },[editVal])

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

        handleAdd(input)


        setInput({
            title: "",
            description: "",
            category: "",
            amount: "0",
            date: "",
            type: ""
        })

        console.log(input)

    }

    return (
        <>

            <form onSubmit={handleSubmit}>
                <label htmlFor="">Title : </label>

                <input type="text" placeholder='enter title' value={input.title} onChange={(e) => handleChange("title", e)} />
                <br />
                <label htmlFor="">Description : </label>
                <input type="text" placeholder='enter Description' value={input.description} onChange={(e) => handleChange("description", e)} />
                <br />
                <label htmlFor="">category : </label>
                <select value={input.category} onChange={(e) => handleChange("category", e)} >
                    <option value="">select</option>
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Housing & Bills">Housing & Bills</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Healthcare">Healthcare</option>
                </select>
                <br />
                <label htmlFor="">Amount : </label>
                <input type="number" placeholder='enter amount' value={input.amount} onChange={(e) => handleChange("amount", e)} />
                <br />
                <label htmlFor="">Date : </label>
                <input type="Date" placeholder='enter date' value={input.date} onChange={(e) => handleChange("date", e)} />
                <br />
                <label htmlFor="">Type : </label>
                <select value={input.type} onChange={(e) => handleChange("type", e)}>
                    <option value="">select</option>
                    <option value="Debit">Debit</option>
                    <option value="Credit">Credit</option>
                </select>
                <br />

                <button type='submit' >{editVal ? "update" : "Add"}</button>
            </form>

        </>
    )
}

export default AddExpense