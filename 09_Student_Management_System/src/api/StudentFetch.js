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