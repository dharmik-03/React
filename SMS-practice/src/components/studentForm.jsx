import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { AddStudent, GetById, UpdateStudent } from "../api/axios"
import { useNavigate, useParams } from 'react-router-dom'

const StudentForm = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [input, setInput] = useState({
        name: "",
        GRid: "",
        course: "",
        MobileNumber: ""

    })

    useEffect(() => {
        if (id) {
            GetStudentData(id)
        }
    }, [id])

    const GetStudentData = async (id) => {
        try {

            const data = await GetById(id)

            setInput({
                name: data.name,
                GRid: data.GRid,
                course: data.course,
                MobileNumber: data.MobileNumber
            })

        } catch (error) {
            console.log(error);

        }
    }

    const handleChange = (field, e) => {
        const newStudent = (prev) => {
            return {
                ...prev,
                [field]: e.target.value
            }
        }

        setInput(newStudent)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            if (id) {
                const res = await UpdateStudent(id, input)

            } else {
                const res = await AddStudent(input)

            }

            setInput({
                name: "",
                GRid: "",
                course: "",
                MobileNumber: ""
            })

            navigate("/")
        } catch (error) {
            console.log(error);

        }
    }



    return (
        <>
            <Container>

                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="Name">Enter Name : </label>
                    <input type="text" value={input.name} onChange={(e) => handleChange("name", e)} />

                    <br />
                    <br />

                    <label htmlFor="GRID">Enter GR ID : </label>
                    <input type="text" value={input.GRid} onChange={(e) => handleChange("GRid", e)} />

                    <br />
                    <br />
                    <label htmlFor="course">Enter course : </label>
                    <select name="" value={input.course} onChange={(e) => handleChange("course", e)} >
                        <option value="">select</option>
                        <option value="full stack development">full stack development</option>
                        <option value="graphic design">graphic design</option>
                        <option value="UI/UX">UI/UX</option>
                    </select>

                    <br />
                    <br />
                    <label htmlFor="mobile">Enter mobile : </label>
                    <input type="number" value={input.MobileNumber} onChange={(e) => handleChange("MobileNumber", e)} />

                    <br />
                    <br />

                    <button type='submit'>{id ? "update" : "add"}</button>

                </form>

            </Container>
        </>
    )
}

export default StudentForm