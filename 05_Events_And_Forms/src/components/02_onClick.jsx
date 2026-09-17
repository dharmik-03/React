import React, { useState } from 'react'

const OnClick = () => {

    const [count,setCount]=useState(0)

    const handleClick=()=>{
        setCount(count+1)
    }

  return (
    <>
    <h1>{count}</h1>
    <br />
    <button onClick={handleClick}>click</button>
    </>
    
  )
}

export default OnClick