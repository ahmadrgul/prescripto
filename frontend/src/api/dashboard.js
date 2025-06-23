import axios from './axios';

export const fetchDashboardStats = async () => {
    try {
        const res = await axios.get('/dashboard/stats/');
        return res.data;
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        throw error;
    }
}

export const fetchRecentAppointments = async () => {
    try {
        const res = await axios.get('/dashboard/recent-appointments/');
        return res.data;
    } catch (error) {
        console.error("Error fetching recent appointment:", error);
        throw error;
    }
}
