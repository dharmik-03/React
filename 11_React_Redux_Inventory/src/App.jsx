import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { increment,decrement,custom,customDecrement,reset } from './feature/CounterSlice'

const App = () => {

    const count=useSelector((state)=>state.counter.count)

    const dispatch=useDispatch()

      const [number, setNumber] = useState(0)


  return (
    <>

    <h1 style={{color:"black"}}>{count}</h1>

      <input type="number" placeholder='enter custom number' value={number} onChange={(e) => setNumber(e.target.value)} />
      <br />
      <br />

      <button onClick={() => dispatch(increment())}  >increment</button>

      <button onClick={() => dispatch(decrement())}  >decrement</button>
      <br />
      <br />

      <button onClick={() => dispatch(custom(number))} >custom increment</button>

      <button onClick={() => dispatch(customDecrement(number))} >custom decrement</button>
      <br />
      <br />

      <button onClick={() => dispatch(reset())} >reset</button> 
    </>
  )
}

export default App