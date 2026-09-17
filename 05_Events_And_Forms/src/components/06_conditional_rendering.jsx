import React, { useState } from 'react'

const Conditional_rendering_2 = () => {

    const [name,setName]=useState("")
    const [color,setColor]=useState("")

    const handleColor=()=>{
        if(name === "red"){
            setColor("red")
        }else if(name === "green"){
            setColor("green")
        }else{
            setColor("black")
        }
    }

  return (

    <>
    
    <input type="text" value={name} placeholder='enter red or green color' onChange={(e)=>setName(e.target.value)} />

    <br />

    <button onClick={handleColor}>change color</button>
    <br />

    <h1 style={{color:color}}>dharmik</h1>

    </>

)
}

export default Conditional_rendering_2