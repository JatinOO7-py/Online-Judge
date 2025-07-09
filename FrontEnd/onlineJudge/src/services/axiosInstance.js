import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://backend.hackathonhub.online",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
