import axios from "./axios";

export const getTokens = async ({ email, password }) => {
  try {
    const { data } = await axios.post("/auth/jwt/create/", {
      email,
      password,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async () => {
  try {
    const { data } = await axios.get("/auth/users/me/");
    return data;
  } catch (error) {
    throw error;
  }
};
