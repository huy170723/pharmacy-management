import axiosClient from "./axiosClient";

const authApi = {
    sendOtp: (email) =>
        axiosClient.post("/auth/send-otp", { email }),

    verifyOtp: (email, otp) =>
        axiosClient.post("/auth/verify-otp", { email, otp }),
};

export default authApi;
