import React, { useState } from 'react'

const Conditional_rendering = () => {

    const [isLogin, setLogin] = useState(false)


    return (

        <>

            {isLogin ? (
                <h1>welcome user</h1>
            ) : (
                <h1>please login</h1>
            )}

            <button onClick={() => setLogin(!isLogin)}>{isLogin ? "logout" : "login"}</button>

        </>

    )

}
    
export default Conditional_rendering