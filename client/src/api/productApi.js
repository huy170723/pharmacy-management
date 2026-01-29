import axiosClient from "./axiosClient";

const productApi = {
    // Gọi đến API của Backend Spring Boot (Mục 4 - Giao diện)
    getAll: () => {
        return axiosClient.get("/products");
    },
    getById: (id) => {
        return axiosClient.get(`/products/${id}`);
    }
};
export default productApi;