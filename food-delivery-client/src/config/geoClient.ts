import axios from "axios";

const geoClient = axios.create({
  baseURL: import.meta.env.VITE_GEOAPIFY_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default geoClient;
