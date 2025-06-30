import axios from './axios';

export const getAppointments = async () => {
  try {
    const { data } = await axios.get('/appointments');
    return data;
  } catch (error) {
    throw error;
  }
}

export const createAppointment = async (body) => {
  try {
    const { data } = await axios.post('/appointments/', body);
    return data;
  } catch (error) {
    throw error;
  }
}