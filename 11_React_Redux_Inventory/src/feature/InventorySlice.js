import React, { act } from 'react'
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: [
        {
            id: 1,
            name: "laptop",
            qty: 1,
            price: 50000,
            category: "electronics"
        }
    ],
    editVal:null
}

const InventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        add: (state, actions) => {
            const newProduct = {
                id: new Date().getTime(),
                ...actions.payload
            }

            state.products.push(newProduct)
        },
        deleteP: (state, actions) => {
            state.products = state.products.filter((d) => d.id !== actions.payload)
        },
        setEditVal:(state,actions)=>{
            state.editVal=state.products.find((l)=>l.id === actions.payload)
        },
        handleEdit:(state,actions)=>{
            const index=state.products.findIndex((l)=>l.id === state.editVal.id)

            if(index !== -1){
                state.products[index]=actions.payload
            }

            state.editVal=null
        }

    }

})

export const { add, deleteP,setEditVal,handleEdit} = InventorySlice.actions

export default InventorySlice.reducer