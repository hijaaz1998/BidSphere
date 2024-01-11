import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:1000/api"
})

export default axiosInstance;