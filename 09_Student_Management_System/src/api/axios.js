import axios from "axios"
const BASEURL = import.meta.env.VITE_BASE_URL;


export const AllStudent = async () => {
    try {

        const res = await axios(`${BASEURL}/AllStudent`)

        if (res.status !== 200) {
            throw new Error("failed to fetch data")
        }

        console.log(res)
        return res.data.AllStudentsData

    } catch (error) {
        console.log(error.message)
        throw error
    }
}

export const AddStudent = async (StudentData) => {
    try {

        const res = await axios.post(`${BASEURL}/add`, StudentData)

        if (res.status !== 201) {
            throw new Error("failed to add student")
        }

        return res.data

    } catch (error) {
        console.log(error.message)
        throw error
    }
}