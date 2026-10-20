import React from 'react'
import AddExpense from './components/AddExpense'
import ExpenseList from './components/expenseList'
import Context from './context/context'
import ExpenseStats from './components/ExpenseStats'
import Counter from './concept/Counter'

const App = () => {
  return (

    <>

      {/* <Context>
        <AddExpense />
        <br />
        <br />
        <ExpenseStats />
        <br />
        <br />
        <ExpenseList />
      </Context> */}

      <Counter />

    </>

  )
}

export default App