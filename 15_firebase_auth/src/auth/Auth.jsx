
import React, { useState } from 'react'

const Auth = () => {


    const [input, setInput] = useState({
        email: "",
        password: ""
    })


    const [isLogin, setLogin] = useState(true)


    const handleChange = (field, e) => {
        setInput((prev) => {
            return {
                ...prev,
                [field]: e.target.value

            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(isLogin){
            console.log("login",input)
        }

        
        if(!isLogin){
            console.log("register",input)
        }
    }

  
    return (

        <>


            <form onSubmit={handleSubmit}>

                <h1>{isLogin?"Login":"register"}</h1>
                <br />

                <label htmlFor="email">Enter Email : </label>
                <input type="email" value={input.email} onChange={(e) => handleChange("email", e)} />
                <br /><br />
                <label htmlFor="password">Enter Password : </label>
                <input type="password" value={input.password} onChange={(e) => handleChange("password", e)} />
                <br /><br />

                <button type='submit'>{isLogin ? "login" : "register"}</button>

                <br /><br />

                <button onClick={()=>setLogin(!isLogin)}>{isLogin ? "New User ? Register " : "already User ? login"}</button>
            </form>
        </>
    )
}

export default Auth