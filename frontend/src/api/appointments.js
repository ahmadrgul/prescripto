import axios from "./axios";

export const getAppointments = async ({ status }) => {
  try {
    const { data } = await axios.get("/appointments", {
      params: {
        state: status,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const createAppointment = async (body) => {
  try {
    const { data } = await axios.post("/appointments/", body);
    return data;
  } catch (error) {
    throw error;
  }
};

export const cancelAppointment = async (id) => {
  try {
    const { data } = await axios.patch(`/appointments/${id}/`, {
      state: "cancelled",
    });
    return data;
  } catch (error) {
    throw error;
  }
};
