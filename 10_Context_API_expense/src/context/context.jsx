import React, { createContext } from 'react'


export const expenseContext = createContext()

const Context = () => {


    const intialValue = [
        {
            id: 1,
            title: "movie",
            description: "dhurandhar",
            category: "Entertainment",
            amount: 501,
            date: "2026-10-21",
            type: "Debit"
        },
        {
            id: 2,
            title: "Shoping",
            description: "Clothes",
            category: "Shoping",
            amount: 5001,
            date: "2026-10-21",
            type: "Debit"
        },

    ]


    // return (

    // )
}

export default Context