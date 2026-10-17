import React from 'react'
import AddExpense from './components/AddExpense'
import ExpenseList from './components/expenseList'
import Context from './context/context'
import ExpenseStats from './components/ExpenseStats'

const App = () => {
  return (

    <>
  <Context>
    <AddExpense/>
    <br />
    <br />
    <ExpenseStats/>
    <br />
    <br />
    <ExpenseList/>
  </Context>
    </>

  )
}

export default App