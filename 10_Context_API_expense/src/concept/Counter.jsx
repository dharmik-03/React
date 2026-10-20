import { act, useReducer, useState } from "react"

const initialArg = {
    Counter: 0
}

function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return {
                ...state,
                Counter: state.Counter + 1
            }

        case "decrement":
            return {
                ...state,
                Counter: state.Counter - 1
            }
        case "custom":
            const number = action.payLoad
            return {
                ...state,
                Counter: state.Counter + Number(number)
            }

        default:
            break;
    }

}

const Counter = () => {

    const [state, dispatch] = useReducer(reducer, initialArg)
    const [number, setNumber] = useState(0)

    return (
        <>

            <h1>{state.Counter}</h1>

            <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
            <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>

            <br />

<br /><br />
<label htmlFor="">Add custom number    </label>
            <input type="number" placeholder="Custom Number" value={number} onChange={(e) => setNumber(e.target.value)} />


            <br />
            <br />

            <button onClick={() => dispatch({ type: "custom", payLoad: number })}>Add {number}</button>

        </>
    )
}

export default Counter