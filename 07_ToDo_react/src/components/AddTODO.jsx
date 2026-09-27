import React, { useState, useEffect } from 'react'

const AddTODO = ({ addTodo, todo, updateTODO, editIndex }) => {


    const [input, setInput] = useState({
        task: "",
        description: ""
    })



    useEffect(() => {
        if (editIndex !== null) {
            setInput({
                task: todo[editIndex].task,
                description: todo[editIndex].description
            })
        }
    }, [editIndex])


    const handleChange = (field, e) => {

        setInput((prev) => {
            return {
                ...prev,
                [field]: e.target.value

            }
        })

    }

    const HandleSubmit = (e) => {
        e.preventDefault()

        if (editIndex !== null) {
            updateTODO(editIndex, input)
        } else {

            if (!input.task || !input.description) {
                return alert("Enter Task And Description")
            }
            addTodo(input)


        }


        setInput({
            task: "",
            description: "",
        });

    }

    return (
        <>

            <form onSubmit={HandleSubmit}>
                <br />

                <input type="text" placeholder='enter task' value={input.task} onChange={(e) => handleChange("task", e)} style={{ padding: "10px", borderRadius: "10px", fontSize: "20px", margin: "10px" }} required />
                <br />
                <br />

                <input type="text" placeholder='enter description' value={input.description} onChange={(e) => handleChange("description", e)} style={{ padding: "10px", borderRadius: "10px", fontSize: "20px", margin: "10px" }} required />

                <br /><br />

                <button type="submit" style={{ padding: "5px", fontSize: "15px", margin: "10px" }}>
                    {editIndex !== null ? "update" : "Add TODO "}
                </button>

            </form>

        </>

    )
}

export default AddTODO