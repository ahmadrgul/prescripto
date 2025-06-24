import axios from './axios';

export const getAppointments = async () => {
  try {
    const { data } = await axios.get('/appointments');
    return data;
  } catch (error) {
    throw error;
  }
}