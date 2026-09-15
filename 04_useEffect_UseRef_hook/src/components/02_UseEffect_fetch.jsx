import { useState,useEffect } from "react";


const Fetch_02=()=>{

    const [user,setUser]=useState([])

    useEffect(()=>{
        async function fecthData() {
            const res=await fetch("https://jsonplaceholder.typicode.com/users")

            const data=await res.json()

            setUser(data)
        }

        fecthData()
    })

    return(
        <>
        
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>email</th>
                </tr>
            </thead>
            <tbody>
                {user.map((u)=>{
                    return(
                        <tr>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )


}

export default Fetch_02