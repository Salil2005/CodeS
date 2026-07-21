import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true             // browser send cookis to server automatically on single request
})

export default axiosInstance;