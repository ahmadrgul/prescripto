import axios from "./axios"

export const checkout = async (id) => {
    try {
        const { data } = await axios.post("/create-checkout-session", {
            appointment_id: id,
        });
        return data;
    } catch (error) {
        throw error;
    }
}