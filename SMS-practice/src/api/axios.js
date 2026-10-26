const URL = import.meta.env.VITE_BASE_URL
import axios from "axios"


export const AllStudent = async () => {

    try {

        const res = await axios(`${URL}/AllStudent`)

        if (res.status !== 200) {
            throw new Error("failed to fetch data")
        }

        return res.data.AllStudentsData

    } catch (error) {
        console.log(error.message)
        throw error
    }

}

export const AddStudent = async (StudentData) => {
    try {

        const res = await axios.post(`${URL}/add`, StudentData)

        if (res.status !== 201) {
            throw new Error("failed to add student")
        }

        return res.data

    } catch (error) {
        console.log(error.message)
        throw error
    }
}

export const DeleteStudent = async (id) => {
    try {

        const res = await axios.delete(`${URL}/delete/${id}`)

        if (res.status !== 200) {
            throw new Error("failed to fetch data")
        }

        return res.data

    } catch (error) {
        console.log(error.message)
        throw error
    }
}


export const UpdateStudent = async (id, StudentData) => {
    try {

        const res = await axios.patch(`${URL}/updateManually/${id}`, StudentData)



        if (res.status !== 200) {
            throw new Error("failed to update student")
        }

        return res.data

    } catch (error) {
        console.log(error.message)
        throw error
    }
}

export const GetById = async (id) => {
    try {

        const res = await axios(`${URL}/StudentWithId/${id}`)


        if (res.status !== 200) {
            throw new Error("failed to fetch data")
        }

        return res.data.studentWithId

    } catch (error) {
        console.log(error.message)
        throw error
    }
}