import { useEffect, useState } from "react";


const LifeCycle = () => {

    const [count, setCount] = useState(0)
    const [name, setName] = useState("")


    const handleCount = () => {
        setCount((d) => d + 1)
    }

    //syntax

    // useEffect(()=>{},[])

    //mounting

    useEffect(() => {
        console.log("mounting")
    })

    //updating

    //empty dependency

    useEffect(() => {
        console.log("updating")
    },[])

    //now with dependency

    useEffect(() => {
        console.log("updating with dependency")
    },[count])

    //unmounting

    //cleanup function

    useEffect(() => {
        console.log("unmounting")

        return()=>{
            console.log("clean up function called")
        }
    },[count])


    return(
        <>
        
        <h1>{count}</h1>
        <button onClick={handleCount} >click</button>
        <br />
        <br />

        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
        <br />
        <h1>{name}</h1>
        </>
    )




}

export default LifeCycle