import React, { useState } from 'react'
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


  const addTodo = (input) => {
    const newTODO = {
      id: Date.now(),
      task: input.task,
      description: input.description,
    }



    setTodo((prev) => [...prev, newTODO])
  }

  console.log("TODO", todo)


  return (
    <>
      <AddTODO addTodo={addTodo} />


      <TodoTable todo={todo} />
    </>
  )
}

export default App