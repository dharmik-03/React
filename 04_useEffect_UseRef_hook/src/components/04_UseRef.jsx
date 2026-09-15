import { useRef } from 'react'

const UseRef = () => {

    const inputRef = useRef()

    const handleClick = () => {
        inputRef.current.focus()
    }



    return (
        <>
            <input type="text" ref={inputRef} />

            <br />

            <button onClick={handleClick}>click</button>
            <br />
            <br />



        </>



    )
}

export default UseRef