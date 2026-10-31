const BASEURL = import.meta.env.VITE_BASE_URL;

export const AllStudent = async () => {
  const res = await fetch(`${BASEURL}/AllStudent`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("failed");
  }
  return data.AllStudentsData;
};

export const AddStudent = async (empDATA) => {
  const res = await fetch(`${BASEURL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(empDATA)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "failed to add Data");
  }
  return data;
};

export const DeleteStudent = async (id) => {
  const res = await fetch(`${BASEURL}/delete/${id}`, {
    method: "DELETE"
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("failed to delete");
  }
  return data;
};
