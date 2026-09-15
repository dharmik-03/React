import { useState,useEffect } from "react";
import axios from "axios"

const Axious=()=>{

    const [user,setUser]=useState([])


    useEffect(()=>{
        async function fecthData() {
            const res=await axios.get("https://jsonplaceholder.typicode.com/users")

            

            setUser(res.data)
        }

        fecthData()
    },[])

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
                        <tr key={u.id}>
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

export default Axious