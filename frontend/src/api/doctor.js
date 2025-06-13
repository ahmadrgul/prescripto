import axios from "axios";

export const fetchDoctorById = async (id) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/doctors/${id}/`)
    return data;
}