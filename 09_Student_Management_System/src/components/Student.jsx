import React, { useEffect, useState } from 'react'
// import { AllStudent } from "../api/StudentFetch"
import { AllStudent } from '../api/axios'
import { Button } from 'react-bootstrap'
// import { DeleteStudent } from '../api/StudentFetch'
import { DeleteStudent } from '../api/axios'
import { useNavigate } from 'react-router-dom'

const Student = () => {


  const navigate = useNavigate()


  const [students, setStudent] = useState([])
  const [loading, SetLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    LoadData()
  }, [])


  const handleDelete = async function (id) {


    try {

      await DeleteStudent(id)

      LoadData()

    } catch (error) {
      console.log(error)
    }

  }


  async function LoadData() {
    try {
      SetLoading(true);

      const data = await AllStudent();

      setStudent(data);

    } catch (error) {
      console.log("ERROR:", error);
      setError(error.message);
    } finally {
      SetLoading(false);
    }
  }

  console.log(students)


  return (
    <>

      <br />
      <div className='container'>

        <table className='table table-bordered table-striped'>
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>name</th>
              <th>GR ID</th>
              <th>Course</th>
              <th>Mobile No.</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.GRid}</td>
                <td>{student.course}</td>
                <td>{student.MobileNumber}</td>
                <td ><Button variant="warning" onClick={()=>navigate(`/edit/${student._id}`)}>Edit</Button></td>
                <td><Button variant='danger' onClick={() => handleDelete(student._id)}>Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  )
}

export default Student