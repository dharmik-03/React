import React, { createContext, useReducer, useState } from 'react'



// export const expenseContext = createContext({
//     expenseList: [],
//     handleAdd: () => { },
//     handleDelete: () => { },
//     editVal: null,
//     handleEdit: () => { },
//     credit: 0,
//     debit: 0,
//     balance: 0
// })

// const Context = ({ children }) => {


//     const intialValue = [
//         {
//             id: 1,
//             title: "movie",
//             description: "dhurandhar",
//             category: "Entertainment",
//             amount: 501,
//             date: "2026-10-21",
//             type: "Debit"
//         },
//         {
//             id: 2,
//             title: "Shoping",
//             description: "Clothes",
//             category: "Shopping",
//             amount: 5001,
//             date: "2026-10-21",
//             type: "Credit"
//         },

//     ]

//     const [expenseList, setExpenseList] = useState(intialValue)

//     const [editVal, setEditVal] = useState(null)


//     const handleAdd = (input) => {

//         if (!input.title ||
//             !input.description ||
//             !input.category ||
//             !input.amount ||
//             !input.date ||
//             !input.type) {
//             alert("All field Are required")
//             return
//         }



//         if (editVal) {

//             setExpenseList((prev) =>
//                 prev.map((t) => t.id === editVal.id ? { ...input, id: editVal.id } : t)
//             )

//             setEditVal(null)

//         } else {
//             const newExpense = {
//                 id: new Date().getTime(),
//                 ...input

//             }

//             setExpenseList((p) => [...p, newExpense])

//         }

//     }


//     const handleDelete = (id) => {

//         const Delete = expenseList.filter((prev) => (prev.id !== id))

//         setExpenseList(Delete)


//     }


//     const handleEdit = (id) => {
//         const editExpense = expenseList.find((prev) => prev.id === id)

//         setEditVal(editExpense)
//     }



//     const debit = expenseList.filter((p) => p.type === "Debit").reduce((acc, curr) => acc + Number(curr.amount), 0)
//     const credit = expenseList.filter((p) => p.type === "Credit").reduce((acc, curr) => acc + Number(curr.amount), 0)
//     const balance = credit - debit
//     console.log("debit", debit)
//     console.log("credit", credit)
//     console.log("balance", balance)


//     const value = {

//         expenseList,
//         handleAdd,
//         handleDelete,
//         editVal,
//         handleEdit,
//         credit,
//         debit,
//         balance
//     }


//     return (
//         <expenseContext.Provider value={value}>{children}</expenseContext.Provider>
//     )
// }

// export default Context


export const ExpenceContext = createContext({
    ExpenseList: [],
    handleAdd: () => { },
    handleDelete: () => { },
    editVal: null,
    handleEdit: () => { },
    credit: 0,
    debit: 0,
    balance: 0
})

const intialArg = {
    ExpenseList: [
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
            category: "Shopping",
            amount: 5001,
            date: "2026-10-21",
            type: "Credit"
        }
    ]

}

function reducer(state, action) {
    switch (action.type) {
        case "Add":

            const newExpence = {
                ...action.payLoad,
                id: new Date().getTime(),
            }
            return {
                ...state,
                ExpenseList: [...state.ExpenseList, newExpence]
            }
        case "Delete":
            const Delete = {

            }

        default:
            return state;
    }
}

const Context = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, intialArg)


    const handleAdd = (input) => {
        if (!input) {
            alert("All Field Required")
            return
        }

        dispatch({ type: "Add", payLoad: input })
    }

    const handleDelete = (id) => {
        dispatch({ type: "Delete", payLoad: id })
    }
    const editVal = ""
    const handleEdit = () => { }
    const credit = ""
    const debit = ""
    const balance = ""

    const value = {
        expenseList: state.ExpenseList,
        handleAdd,
        handleDelete,
        handleDelete,
        editVal,
        handleEdit,
        credit,
        debit,
        balance
    }


    return (
        <ExpenceContext.Provider value={value}>{children}</ExpenceContext.Provider>
    )
}

export default Context