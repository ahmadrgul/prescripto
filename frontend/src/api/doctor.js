import axios from "./axios";

export const fetchDoctorById = async (id) => {
    const { data } = await axios.get(`/doctors/${id}/`)
    return data;
}

export const addDoctor = async (doctorData) => {
    try {
        const res = await axios.post('/doctors/', doctorData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error adding doctor:', error.response.data);
    }
}

export const fetchDoctors = async (specialization = '') => {
    try {
        const { data } = await axios.get(`/doctors/`, {
            params: {
                speciality: specialization ? specialization : {},
            },
        });
        return data;
    } catch (error) {
        console.error('Error fetching doctors:', error.response.data);
        throw error;
    }
}

export const deleteDoctor = async (id) => {
    try {
        const res = await axios.delete(`/doctors/${id}/`);
    } catch (error) {
        console.error("Error Deleting Doctor", error.response.data);
    }
}

export const fetchTopDoctors = async () => {
    try {
        const res = await axios.get('/top-docs');
        return res.data;
    } catch (error) {
        console.error('Error fetching top doctors:', error.response.data);
        throw error;
    }
}