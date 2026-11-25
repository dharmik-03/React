import { useSelector,useDispatch } from 'react-redux'
import { fetchProduct } from '../features/productThunk'
import React, { useEffect } from 'react'

const ProductList = () => {

    useEffect(()=>{
        dispatch(fetchProduct())
    },[fetchProduct])

    const dispatch=useDispatch()


    const {products,loading,error}=useSelector((state)=>state.product)


    if(loading){
        return <h1 style={{textAlign:"center"}}>Loading....</h1>
    }

    if(error){
        return <h1 style={{textAlign:"center"}}>{error}</h1>
    }

    return (
        <>

            <table border={4} style={{margin:"20px"}}>
                <thead>
                    <tr>
                        <th>Sr No.</th>
                        <th>Title</th>
                        <th>price</th>
                        <th>description</th>
                        <th>category</th>
                        <th>Image</th>
                        <th colSpan={2}>Rating
                            <tr>
                                <th>rate</th>
                                <th>count</th>
                            </tr>
                        </th>

                    </tr>
                </thead>
                <tbody>

            {products.map((p,index)=>{
                return(
                    <tr key={p.id}>
                        <td>{index + 1}</td>
                        <td>{p.title}</td>
                        <td>{p.price}</td>
                        <td>{p.description}</td>
                        <td>{p.category}</td>
                        <td><img src={p.image} style={{height:"150px",width:"150px"}} alt="" /></td>
                        <td>{p.rating.rate}</td>
                        <td>{p.rating.count}</td>
                    </tr>
                )
            })}

                </tbody>
            </table>

        </>
    )
}

export default ProductList