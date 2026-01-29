import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const authService = {
    register: (data) => {
        return axios.post(`${API_URL}/register`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    },

    login: (data) => {
        return axios.post(`${API_URL}/login`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
};

export default authService;
