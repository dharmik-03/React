import React, { useState } from 'react'
import { Col, FloatingLabel, Row, Form } from 'react-bootstrap'

const AddStudent = () => {


    const [studentData, setStudentData] = useState({
        name: "",
        GRid: "",
        course: "",
        mobile: ""

    })

    const handleChange = (field, e) => {

        return (
            setStudentData((prev) => ({
                ...prev,
                [field]: e.target.value
            }))
        )

    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(studentData)


    }


    return (
        <>

            <div className='container mt-3'>

                <Form onSubmit={handleSubmit}>


                    <Row >
                        <Col md={6}>
                            <FloatingLabel
                                controlId="name"
                                label="Enter Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Name" value={studentData.name} onChange={((e) => handleChange("name", e))} />
                            </FloatingLabel>
                        </Col>

                        <Col md={6}>
                            <FloatingLabel controlId="GRid" label="GR ID">
                                <Form.Control type="number" placeholder="GRid" value={studentData.GRid} onChange={((e) => handleChange("GRid", e))} />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel controlId="course" label="Course">
                                <Form.Control type="text" placeholder="course" value={studentData.course} onChange={((e) => handleChange("course", e))} />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel controlId="mobilenumber" label="mobile number">
                                <Form.Control type="number" placeholder="mobile" value={studentData.mobile} onChange={((e) => handleChange("mobile", e))} />
                            </FloatingLabel>
                        </Col>

                    </Row>
                    <button className='btn border mt-3' type='submit'>Add</button>
                </Form>

            </div>

        </>

    )
}

export default AddStudent