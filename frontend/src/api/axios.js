import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
   const originalRequest = error.config;
   if (
    error.response?.status === 401 &&
    error.response.data.errors.some(error => error.code === "token_not_valid")
   ) {
    try {
      const res = await axios.post(`${baseURL}/auth/jwt/refresh`, {
        refresh: localStorage.getItem("refresh")
      })
      localStorage.setItem("access", res.data.access);
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${res.data.access}`;
      originalRequest.headers['Authorization'] = `Bearer ${res.data.access}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return Promise.reject(refreshError);
    }
   }

   return Promise.reject(error);
  }
)

export default axiosInstance;
