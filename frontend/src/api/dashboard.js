import axios from './axios';

export const getDashboardStats = async () => {
    try {
        const { data } = await axios.get('/dashboard/stats/');
        return data;
    } catch (error) {
        throw error;
    }
}

export const getRecentAppointments = async () => {
    try {
        const { data } = await axios.get('/dashboard/recent-appointments/');
        return data;
    } catch (error) {
        throw error;
    }
}
