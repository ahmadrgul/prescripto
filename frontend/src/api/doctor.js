import axios from "./axios";

export const getDoctors = async (specialization = "") => {
  try {
    const { data } = await axios.get(`/doctors/`, {
      params: {
        speciality: specialization ? specialization : {},
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getDoctorById = async (id) => {
  try {
    const { data } = await axios.get(`/doctors/${id}/`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createDoctor = async (doctorData) => {
  try {
    const { data } = await axios.post("/doctors/", doctorData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteDoctor = async (id) => {
  try {
    const { data } = await axios.delete(`/doctors/${id}/`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTopDoctors = async () => {
  try {
    const data = await axios.get("/top-docs");
    console.log(data)
    // return data;
  } catch (error) {
    throw error;
  }
};

export const getScheduleById = async (id) => {
  try {
    const { data } = await axios.get(`/doctors/${id}/schedule`);
    return data;
  } catch (error) {
    throw error;
  }
};
