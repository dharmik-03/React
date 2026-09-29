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
    setInput(prev => ({
      ...prev,
      [field]: e.target.value
    }))
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
      description: ""
    })
  }

  return (
    <form className="container mb-4 todo-form "  onSubmit={HandleSubmit}>

    <div className='d-flex justify-content-center gap-3 '>
          <input
        type="text"
        placeholder="Enter task"
        value={input.task}
        onChange={(e) => handleChange("task", e)}
        className="form-control mb-3"
      />

      <input
        type="text"
        placeholder="Enter description"
        value={input.description}
        onChange={(e) => handleChange("description", e)}
        className="form-control mb-3"
      />
    </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          {editIndex !== null ? "Update" : "Add TODO"}
        </button>
      </div>

    </form>
  )
}


export default AddTODO