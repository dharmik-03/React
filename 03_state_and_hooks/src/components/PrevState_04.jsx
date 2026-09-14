import { useState } from "react";

const PrevState_04 = () => {

    const [count, setCount] = useState(0)

    const handleClick = () => {
        setCount((prev) => prev + 1)
    }

    

    return(
        <>
        
        <h1>prev state</h1>
        <h1>{count}</h1>

        <button onClick={handleClick}>click for increase 1</button>

        <br />
        <br />

        <button onClick={()=>{
            handleClick()
            handleClick()
            handleClick()
            handleClick()
            handleClick()
        }}>click for increase 5</button>

        </>
    )

}

export default PrevState_04