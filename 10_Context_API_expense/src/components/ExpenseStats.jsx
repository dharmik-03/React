import React, { useContext } from 'react'
import { ExpenceContext } from '../context/contexts'

const ExpenseStats = () => {


    const { balance, credit, debit } = useContext(ExpenceContext)

    return (
        <>
            <div>
                <h2> Credit : {credit}</h2>
                <h2> debit : {debit}</h2>
                <h2>Balance :{balance}</h2>
            </div>
        </>
    )
}

export default ExpenseStats