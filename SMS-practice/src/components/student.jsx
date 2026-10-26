import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { AllStudent, DeleteStudent } from '../api/axios'
import { useNavigate } from 'react-router-dom'
const StudentPage = () => {

    const navigate = useNavigate()


    const [student, setStudent] = useState([])

    useEffect(() => {
        LoadStudent()
    }, [])

    const LoadStudent = async () => {
        try {
            const data = await AllStudent()

            setStudent(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await DeleteStudent(id)

            LoadStudent()
        } catch (error) {
            console.log(error)

        }
    }


    return (
        <>


            <Container>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>GR ID</th>
                            <th>Course</th>
                            <th>Mobile Number</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {student.map((s, index) => (
                            <tr key={s._id}>
                                <td>{index + 1}</td>
                                <td>{s.name}</td>
                                <td>{s.GRid}</td>
                                <td>{s.course}</td>
                                <td>{s.MobileNumber}</td>
                                <td><button onClick={() => navigate(`edit/${s._id}`)}>EDIT</button></td>
                                <td><button onClick={() => handleDelete(s._id)}>DELETE</button></td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </Container>

        </>
    )
}

export default StudentPage