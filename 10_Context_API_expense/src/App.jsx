import React from 'react'
import AddExpense from './components/AddExpense'
import ExpenseList from './components/expenseList'
import Context from './context/contexts'
import ExpenseStats from './components/ExpenseStats'
import Counter from './concept/Counter'

const App = () => {
  return (

    <>

      <Context>
        <AddExpense />
        <br />
        <br />
        <ExpenseStats />
        <br />
        <br />
        <ExpenseList />
        <br />
        <br />

      </Context>

      {/* <Counter /> */}

    </>

  )
}

export default App