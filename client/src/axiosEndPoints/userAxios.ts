import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:1000/api"
})

axiosInstance.interceptors.request.use(
    (config) => {
        const tokenString = localStorage.getItem('userToken');
        
        if (tokenString) {
            try {
                console.log("tokenString",tokenString);
                
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