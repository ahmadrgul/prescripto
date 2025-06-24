import axios from "./axios";

export const fetchPatients = async () => {
    try {
        const res = await axios.get('/patients/');
        return res.data;
    } catch (error) {
        throw new Error('Error fetching patients: ' + error.message);
    }
}

export const addPatient = async ({ firstname, email, password }) => {
    try {
        const formData = new FormData();
        formData.append('first_name', firstname);
        formData.append('email', email);
        formData.append('password', password);
        const res = await axios.post('/patients/', formData);

        return res.data;
    } catch (error) {
        throw error;
    }
}
