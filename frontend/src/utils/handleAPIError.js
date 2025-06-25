import axios from "axios";
import { toast } from "react-toastify";

export const handleAPIError = (error) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const status = error.response.status;
            const errors = error.response.data?.errors;
            
            errors.forEach(err => {
                const attr = err.attr ? `${err.attr}: ` : '';
                toast.error(`${attr}${err.detail}`);
            });
        } else if (error.request){
            toast.error(`Server not responding. Please check your network connection.`);
        } else {
            toast.error("Error setting up a request.")
        }
    } else {
        toast.error("An unexpected error occurred.");
    }
};
