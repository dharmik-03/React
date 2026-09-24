import React, { useState } from 'react'

const AddTODO = ({ addTodo }) => {


    const [input, setInput] = useState({
        task: "",
        description: ""
    })


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

        addTodo(input)


        setInput({
            task: "",
            description: "",
        });

    }

    return (
        <>

            <form onSubmit={HandleSubmit}>
                <br />

                <input type="text" placeholder='enter task' value={input.task} onChange={(e) => handleChange("task", e)} style={{ padding: "10px", borderRadius: "10px", fontSize: "20px",margin:"10px" }} />
                <br />
                <br />

                <input type="text" placeholder='enter description' value={input.description} onChange={(e) => handleChange("description", e)} style={{ padding: "10px", borderRadius: "10px", fontSize: "20px",margin:"10px" }} />

                <br /><br />

                <button type="submit" style={{padding:"5px",fontSize:"15px",margin:"10px"}}>Add ToDo</button>

            </form>

        </>

    )
}

export default AddTODO