import axios from "./axios";

export const fetchTokens = async ({ email, password }) => {
    try {
        const res = await axios.post("/auth/jwt/create/", {
            email,
            password,
        });

        return res.data;
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;
            
            if (data.detail) {
                const err = new Error(data.detail);
                err.status = status;
                throw err;
            } else {
                let message = "Login Failed";
                if (typeof data == 'object') {
                    const messages = Object.entries(data).map(([field, msgs]) => (
                        `${field}: ${msgs.join(", ")}`
                    ));
                    message = messages.join(" | ");
                }
    
                const err = new Error(message);
                err.status = status;
                throw err;
            }

        } else {
            throw new Error(error.message)
        }
    }
}

export const fetchUserData = async () => {
    try {
        const res = await axios.get("/auth/users/me/");
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch user data");
    }
}