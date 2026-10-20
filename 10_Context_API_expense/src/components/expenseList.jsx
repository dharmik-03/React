
import { useContext, useState } from 'react'
import { expenseContext } from '../context/context'

const ExpenseList = () => {

    const { expenseList, handleDelete, handleEdit } = useContext(expenseContext)

    const [expenseTQuery, setExpenseTQuery] = useState({
        title: "",
        category: "",
        type: "",
        sort: ""
    })

    const handleChange = (field, e) => {

        setExpenseTQuery((prev) => {
            return {
                ...prev,
                [field]: e.target.value
            }
        })

    }

    const filterList = expenseList
        .filter((l) => l.title.toLowerCase().includes(expenseTQuery.title.toLowerCase()))
        .filter((l) => l.type.includes(expenseTQuery.type))
        .filter((l) => l.category.includes(expenseTQuery.category))


    const sortedList = [...filterList].sort((a, b) => {
        if (expenseTQuery.sort === "ascending") {
            return a.id - b.id
        }

        if (expenseTQuery.sort === "descending") {
            return b.id - a.id
        }

        if (expenseTQuery.sort === "moneyAsc") {
            return Number(a.amount) - Number(b.amount)
        }

        if (expenseTQuery.sort === "moneyDsc") {
            return Number(b.amount) - Number(a.amount)
        }
    })


    return (

        <>


            <form action="">

                <label htmlFor="title">Title</label>
                <input type="text" value={expenseTQuery.title} onChange={((e) => handleChange("title", e))} />
                <label htmlFor="type">Type</label>


                <select value={expenseTQuery.type} onChange={((e) => handleChange("type", e))}>
                    <option value="">Select</option>
                    <option value="Debit">Debit</option>
                    <option value="Credit">Credit</option>
                </select>
                <label htmlFor="category">category</label>


                <select value={expenseTQuery.category} onChange={((e) => handleChange("category", e))}>
                    <option value="">select</option>
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Housing & Bills">Housing & Bills</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Healthcare">Healthcare</option>
                </select>

                <label htmlFor="sort">Sort</label>
                <select value={expenseTQuery.sort} onChange={((e) => handleChange("sort", e))}>
                    <option value="">select</option>
                    <option value="ascending">ascending</option>
                    <option value="descending">descending</option>
                    <option value="moneyAsc">Money Ascending</option>
                    <option value="moneyDsc">Money Descending</option>
                </select>


                <br /><br />
                <button
                    type="button"
                    onClick={() =>
                        setExpenseTQuery({
                            title: "",
                            category: "",
                            type: "",
                            sort: "",
                        })
                    }
                >
                    Clear Filter
                </button>

            </form>

            <br /><br /><br />
            <table border={2}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedList.map((t, index) => {
                        return (

                            <tr key={t.id}>

                                <td>{index + 1}</td>
                                <td>{t.title}</td>
                                <td>{t.description}</td>
                                <td>{t.category}</td>
                                <td>{t.amount}</td>
                                <td>{t.date}</td>
                                <td>{t.type}</td>
                                <td><button onClick={() => handleEdit(t.id)}>Edit</button></td>
                                <td><button onClick={() => handleDelete(t.id)}>Delete</button></td>

                            </tr>

                        )
                    })}
                </tbody>

            </table>
        </>
    )
}

export default ExpenseList