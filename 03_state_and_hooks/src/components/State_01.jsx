import { useState } from "react";

const State_01 = () => {

  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1)
  }

  console.log("print")
  return (
    <>
    
    <h1>{counter}</h1>
    
    <button onClick={handleClick}>Click</button>
    {/* <button onClick={()=>setCounter(counter+1)}>click</button> */}

    {/* <button onClick={(e)=>handleClick(e)} >click</button> */}

    {/* <button onClick={handleClick()} >click</button> */}

    </>
  )

}

export default State_01