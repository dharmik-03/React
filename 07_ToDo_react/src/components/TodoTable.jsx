import React from 'react'

const TodoTable = ({ todo }) => {


    return (

        <>


        <br />

            <table border={1} style={{margin:"10px",width:"500px"}}>
                <thead style={{padding:"20px",fontSize:"20px",backgroundColor:"lightgreen"}}>
                    <tr>
                        <th>ID</th>
                        <th>TASK</th>
                        <th>DESCRIPTION</th>
                    </tr>
                </thead>
                <tbody style={{padding:"20px",fontSize:"20px",backgroundColor:"lightblue"}}>
                    {todo.map((item, index) => (
                        <tr key={item.i}>
                            <td>{index + 1}</td>
                            <td>{item.task}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    )
}

export default TodoTable