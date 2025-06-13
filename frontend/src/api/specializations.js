import axios from "axios";

export const fetchSpecializations = async () => {
    const data =  await axios.get("http://127.0.0.1:8000/api/specializations")
    return data;
}