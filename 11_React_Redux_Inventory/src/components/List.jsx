import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import {deleteP, setEditVal} from "../feature/InventorySlice"


const List = () => {
    const product = useSelector((state)=>state.inventory.products)


    const dispatch = useDispatch()

    return (
        <>

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
                    {product.map((l,index)=>{
                      return(
                          <tr key={l.id}>
                            <td>{index+1}</td>
                            <td>{l.name}</td>
                            <td>{l.qty}</td>
                            <td>{l.price}</td>
                            <td>{l.category}</td>
                            <td>
                                <button onClick={()=>dispatch(setEditVal(l.id))}>EDIT</button>
                            </td>
                            <td>
                                <button onClick={()=>dispatch(deleteP(l.id))}>DELETE</button>
                            </td>
                        </tr>
                      )
                    }) }
                </tbody>
            </table>
        </>
    )
}

export default List