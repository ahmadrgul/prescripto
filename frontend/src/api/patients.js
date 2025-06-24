import axios from "./axios";

export const fetchPatients = async () => {
    try {
        const res = await axios.get('/patients/');
        return res.data;
    } catch (error) {
        throw new Error('Error fetching patients: ' + error.message);
    }
}