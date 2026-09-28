import React, { useState } from 'react'
import AddTODO from './components/AddTODO'
import TodoTable from './components/TodoTable'
import Status from './components/status'
const App = () => {

  const IntialTODOS = [
    {
      id: 1,
      task: "learn react",
      description: "react basic terms",
      completed: false,
    },
    {
      id: 2,
      task: "practice",
      description: "practice of react",
      completed: false,
    }
  ]

  const [todo, setTodo] = useState(IntialTODOS)
  const [editIndex, setEditIndex] = useState(null)

  const addTodo = (input) => {
    const newTODO = {
      id: Date.now(),
      task: input.task,
      description: input.description,
      completed: false,
    }

    setTodo(prev => [...prev, newTODO])
  }

  const editTODO = (index) => {
    setEditIndex(index)
  }

  const updateTODO = (index, input) => {
    setTodo(prev => {
      const updateTodo = [...prev]

      updateTodo[index] = {
        ...updateTodo[index],
        task: input.task,
        description: input.description,
      }

      return updateTodo
    })

    setEditIndex(null)
  }

  const deleteTodo = (index) => {
    setTodo(todo.filter((item, i) => i !== index))
  }

  const toggleTaskCompleted = (id) => {
    setTodo(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

 return (
  <div className="app">
    <div className="todo-box">

      <h1 className="text-center mb-4">Todo App</h1>

      <Status todo={todo} />

      <AddTODO
        addTodo={addTodo}
        updateTODO={updateTODO}
        todo={todo}
        editIndex={editIndex}
      />

      <TodoTable
        todo={todo}
        editTODO={editTODO}
        deleteTodo={deleteTodo}
        toggleTaskCompleted={toggleTaskCompleted}
      />

    </div>
  </div>
)
}

export default App