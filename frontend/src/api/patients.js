import axios from "./axios";

export const getPatients = async () => {
  try {
    const { data } = await axios.get("/patients/");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPatientById = async (id) => {
  try {
    const { data } = await axios.get(`/patients/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createPatient = async ({ firstname, email, password }) => {
  try {
    const formData = new FormData();
    formData.append("first_name", firstname);
    formData.append("email", email);
    formData.append("password", password);

    const { data } = await axios.post("/patients/", formData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const patchPatient = async ({ id, fields }) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (value) {
      formData.append(key, value);
    }
  }

  try {
    const { data } = await axios.patch(`/patients/${id}/`, formData);
    return data;
  } catch (error) {
    throw error;
  }
};
