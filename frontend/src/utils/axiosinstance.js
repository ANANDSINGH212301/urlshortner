import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_API_URL || window.location.origin
    : "http://localhost:3000",
  timeout: 10000, //server timeout
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with a status other than 200
      console.error(`Error: ${error.response.status} - ${error.response.data || error.message}`)
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received from server.')
    } else {
      console.error('Axios error:', error.message)
    }
    return Promise.reject(error)
  }
);

export default axiosInstance;