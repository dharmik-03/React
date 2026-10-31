import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL || 'https://node-js-3-u0e0.onrender.com/student';

export const AllStudent = async () => {
  const res = await axios.get(`${BASEURL}/AllStudent`);

  if (res.status !== 200 || !res.data) {
    throw new Error("Failed to fetch students from server");
  }

  return res.data.AllStudentsData || [];
};

export const AddStudent = async (studentData) => {
  const payload = {
    name: studentData.name.trim(),
    GRid: Number(studentData.GRid),
    course: studentData.course,
    MobileNumber: Number(studentData.MobileNumber),
  };

  const res = await axios.post(`${BASEURL}/add`, payload);

  if (res.status !== 200 && res.status !== 201) {
    throw new Error(res.data?.message || "Failed to add student to database");
  }

  return res.data;
};

export const DeleteStudent = async (id) => {
  const res = await axios.delete(`${BASEURL}/delete/${id}`);

  if (res.status !== 200) {
    throw new Error(res.data?.message || "Failed to delete student from database");
  }

  return res.data;
};

export const UpdateStudent = async (id, studentData) => {
  const payload = {
    name: studentData.name.trim(),
    GRid: Number(studentData.GRid),
    course: studentData.course,
    MobileNumber: Number(studentData.MobileNumber),
  };

  const res = await axios.patch(`${BASEURL}/updateManually/${id}`, payload);

  if (res.status !== 200) {
    throw new Error(res.data?.message || "Failed to update student in database");
  }

  return res.data;
};

export const getStudent = async (id) => {
  const res = await axios.get(`${BASEURL}/StudentWithId/${id}`);

  if (res.status !== 200 || !res.data?.studentWithId) {
    throw new Error(res.data?.message || "Student not found in database");
  }

  return res.data.studentWithId;
};
