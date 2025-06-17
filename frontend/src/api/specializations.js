import axios from "./axios";

export const fetchSpecializations = async () => {
    const res =  await axios.get("/specializations");
    return res.data;
}