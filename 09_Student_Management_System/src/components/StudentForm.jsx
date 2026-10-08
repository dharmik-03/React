import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import validationSchema from '../validation/validation';
// import { AddStudent } from "../api/StudentFetch"
import { AddStudent } from "../api/axios"
import { useNavigate } from 'react-router-dom';


function FormExample() {
    const { Formik } = formik;
    const navigate = useNavigate()


    return (
        <>



            <div className="container mt-5">

                <Formik
                    validationSchema={validationSchema}
                    onSubmit={async (value, { resetForm }) => {
                        const result = await AddStudent(value)

                        resetForm()

                        if (result) {
                            navigate("/")
                        }

                    }}
                    initialValues={{
                        name: '',
                        GRid: '',
                        course: '',
                        MobileNumber: '',

                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>


                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="validationFormik101"
                                >
                                    <Form.Label>Name</Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isValid={touched.name && !errors.name}
                                    />

                                    <Form.Control.Feedback>
                                        Looks good!
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Row>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="validationFormik103"
                                    className="position-relative"
                                >
                                    <Form.Label>GR id</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="GRid"
                                        name="GRid"
                                        value={values.GRid}
                                        onChange={handleChange}
                                        isInvalid={!!errors.GRid}
                                    />

                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.GRid}
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Row>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="validationFormik102"
                                    className="position-relative"
                                >
                                    <Form.Label>course</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        name="course"
                                        placeholder="course"
                                        value={values.course}
                                        onChange={handleChange}
                                        isInvalid={!!errors.course}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.course}
                                    </Form.Control.Feedback>
                                </Form.Group>


                            </Row>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="validationFormik104"
                                    className="position-relative"
                                >
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control
                                        type="number"
                                        required
                                        name="MobileNumber"
                                        placeholder="Mobile Number"
                                        value={values.MobileNumber}
                                        onChange={handleChange}
                                        isInvalid={!!errors.MobileNumber}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.MobileNumber}
                                    </Form.Control.Feedback>
                                </Form.Group>


                            </Row>

                            <Button type="submit">Submit form</Button>
                        </Form>
                    )}
                </Formik >



            </div >
        </>
    );
}

export default FormExample;