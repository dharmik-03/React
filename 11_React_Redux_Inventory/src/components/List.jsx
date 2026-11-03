import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { deleteP, setEditVal } from "../feature/InventorySlice"


const List = () => {
    const product = useSelector((state) => state.inventory.products)

    const [query, setQuery] = useState({
        search: "",
        option: ""
    })

    const handleChnage = (field, e) => {
        setQuery((prev) => {
            return {
                ...prev,
                [field]: e.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(query)
    }

    const dispatch = useDispatch()

    const filter = product.filter((l) => l.name.toLowerCase().includes(query.search.toLowerCase()))

    const Sort = [...filter].sort((a, b) => {

         if (query.option === "asc") {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        }
        if (query.option === "desc") {
            return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        }
        if (query.option === "Pasc") {
            return Number(a.price) - Number(b.price)
        }
        if (query.option === "Pdesc") {
            return Number(b.price) - Number(a.price)
        }
        if (query.option === "qtyAsc") {
            return Number(a.qty) - Number(b.qty)
        }
        if (query.option === "qtyDesc") {
            return Number(b.qty) - Number(a.qty)
        }
    })

    return (
        <>

            <form onSubmit={handleSubmit} >


                <input type="text" placeholder='Search Name' value={query.search} onChange={(e) => handleChnage("search", e)} />
                <select value={query.option} onChange={(e) => handleChnage("option", e)}>
                    <option value="">Select</option>
                    <option value="asc" >Ascending</option>
                    <option value="desc">Descending</option>
                    <option value="Pasc">Price Ascending</option>
                    <option value="Pdesc">Price Descending</option>
                    <option value="qtyAsc">Quantity Ascending</option>
                    <option value="qtyDesc">Quantity Descending</option>
                </select>


                <button onClick={()=>setQuery({search:"",option :""})}>Clear Filter</button>
            </form>

            <br /><br />
            <table border={2}>
                <thead>
                    <tr>
                        <th>NO.</th>
                        <th>Name</th>
                        <th>qty</th>
                        <th>price</th>
                        <th>category</th>
                        <th colSpan={2}>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Sort.map((l, index) => {
                        return (
                            <tr key={l.id}>
                                <td>{index + 1}</td>
                                <td>{l.name}</td>
                                <td>{l.qty}</td>
                                <td>{l.price}</td>
                                <td>{l.category}</td>
                                <td>
                                    <button onClick={() => dispatch(setEditVal(l.id))}>EDIT</button>
                                </td>
                                <td>
                                    <button onClick={() => dispatch(deleteP(l.id))}>DELETE</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default List