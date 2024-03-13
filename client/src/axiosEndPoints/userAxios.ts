import axios from "axios";

const baseUrl = import.meta.env.VITE_URL;

const axiosInstance = axios.create({
    baseURL: baseUrl
})

axiosInstance.interceptors.request.use(
    (config) => {
        const tokenString = localStorage.getItem('userToken');
        if (tokenString) {
            try {                
                const token = JSON.parse(tokenString);

                config.headers.Authorization = `Bearer ${token}`;
            } catch (error) {
                console.error("Error parsing token",error)
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;