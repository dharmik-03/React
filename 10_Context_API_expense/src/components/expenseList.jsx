
import { useContext } from 'react'
import { expenseContext } from '../context/context'

const ExpenseList = () => {

    const { expenseList, handleDelete ,handleEdit} = useContext(expenseContext)


    return (

        <>


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
                    {expenseList.map((t, index) => {
                        return (

                            <tr key={t.id}>

                                <td>{index + 1}</td>
                                <td>{t.title}</td>
                                <td>{t.description}</td>
                                <td>{t.category}</td>
                                <td>{t.amount}</td>
                                <td>{t.date}</td>
                                <td>{t.type}</td>
                                <td><button onClick={()=>handleEdit(t.id)}>Edit</button></td>
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