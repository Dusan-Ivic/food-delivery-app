import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(null, (error) => {
  const message = error.response?.data?.message || "Something went wrong. Please try again.";
  toast.error(message);
  return Promise.reject(error);
});

export default apiClient;
