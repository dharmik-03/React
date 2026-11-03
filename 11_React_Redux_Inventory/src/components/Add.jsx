import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, handleEdit } from '../feature/InventorySlice'

const Add = () => {


    const dispatch = useDispatch()

    const [product, setProduct] = useState({
        name: "",
        qty: "",
        price: "",
        category: ""
    })

    const {editVal}=useSelector((state)=>state.inventory)

    useEffect(()=>{
        editVal?setProduct(editVal):null
    },[editVal])

    const handleChange = (field, e) => {
        setProduct((prev) => {
            return {
                ...prev,
                [field]: e.target.value
            }
        })
    }

    const handleSubmit = (e) => {

        e.preventDefault()

        if(editVal){

            dispatch(handleEdit(product))

              setProduct({
            name: "",
            qty: "",
            price: "",
            category: "",
        })

        }else{
            dispatch(add(product))

        setProduct({
            name: "",
            qty: "",
            price: "",
            category: "",
        })
        }

        console.log(product)
    }

    return (




        <>

            <h1>Add New Product</h1>

            <form onSubmit={handleSubmit}>

                <label htmlFor="">Enter name</label>
                <input type="text" value={product.name} onChange={(e) => handleChange("name", e)} />
                <br /><br />

                <label htmlFor="">Enter Quantity</label>
                <input type="number" value={product.qty} onChange={(e) => handleChange("qty", e)} />
                <br /><br />

                <label htmlFor="">Enter Price</label>
                <input type="number" value={product.price} onChange={(e) => handleChange("price", e)} />
                <br /><br />

                <label htmlFor="">Enter Category</label>
                <input type="text" value={product.category} onChange={(e) => handleChange("category", e)} />
                <br /><br />


                <button type='submit'>Add</button>
            </form>
        </>

    )
}

export default Add