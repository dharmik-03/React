const BASEURL = import.meta.env.VITE_BASE_URL;

export const AllStudent = async () => {
  const res = await fetch(`${BASEURL}/AllStudent`);

  const data = await res.json();

  console.log("API RESPONSE:", data);

  if (!res.ok) {
    throw new Error("failed");
  }

  return data.AllStudentsData;
};

export const AddStudent = async (empDATA) => {

  try {

    const res = await fetch(`${BASEURL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(empDATA)
    })


    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || "failed to add Data")
    } else {
      console.log("student added successfully")
    }


    return data

  } catch (error) {
    console.log(error.message)
    throw error

  }

}


export const DeleteStudent = async (id) => {
  try {
    const res = await fetch(`${BASEURL}/delete/${id}`, {
      method: "DELETE"
    })

    const data = await res.json()


    if (!res.ok) {
      throw new Error("failed to delete");
    }


    return data

  } catch (error) {
    console.log(error.message)
    throw error
  }
}