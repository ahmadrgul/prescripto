import axios from './axios';

export const getAppointments = async () => {
  try {
    const response = await axios.get('/appointments');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching appointments: ' + error.message);
  }
}