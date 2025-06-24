import axios from "./axios";

export const fetchSpecializations = async () => {
    try {
        const { data } =  await axios.get("/specializations");
        return data;
    } catch (error) {
        throw error;
    }
}