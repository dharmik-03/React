import React, { use, useState } from 'react'
import AddTODO from './components/AddTODO'
import TodoTable from './components/TodoTable'

const App = () => {


  const IntialTODOS = [
    {
      id: 1,
      task: "learn react",
      description: "react basic terms"
    },
    {
      id: 2,
      task: "practice",
      description: "practice of react"
    }
  ]


  const [todo, setTodo] = useState(IntialTODOS)

  const [editIndex, setEditIndex] = useState(null)




  const addTodo = (input) => {
    const newTODO = {
      id: Date.now(),
      task: input.task,
      description: input.description,
    }

    setTodo((prev) => [...prev, newTODO])
  }

  const editTODO = (index) => {
    setEditIndex(index)
  }

  const updateTODO = (index, input) => {
    setTodo((prev) => {
      const updateTodo = [...prev]

      updateTodo[index] = {
        ...updateTodo[index],
        task: input.task,
        description: input.description
      }

      return updateTodo


    })

    setEditIndex(null)
  }


  const deleteTodo = (index) => {
  setTodo(todo.filter((item, i) => i !== index))
}

  console.log("TODO", todo)


  return (
    <>
      <AddTODO addTodo={addTodo} updateTODO={updateTODO} todo={todo} editIndex={editIndex} />


      <TodoTable todo={todo} editTODO={editTODO}  deleteTodo={deleteTodo}/>
    </>
  )
}

export default App