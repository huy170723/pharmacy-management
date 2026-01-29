import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api", // Chỉ dừng ở /api
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient;