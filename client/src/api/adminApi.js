import axiosClient from "./axiosClient";

const adminApi = {
    // Kết nối thực tế: baseURL(/api) + /admin/revenue = /api/admin/revenue
    getStatistics: () => axiosClient.get('/admin/revenue'),
    getProducts: () => axiosClient.get('/admin/products'),
    createProduct: (data) => axiosClient.post('/admin/products', data),
    updateProduct: (id, data) => axiosClient.put(`/admin/products/${id}`, data),
    deleteProduct: (id) => axiosClient.delete(`/admin/products/${id}`),

    getCategories: () => axiosClient.get('/admin/categories'),
    createCategory: (data) => axiosClient.post('/admin/categories', data),
    updateCategory: (id, data) => axiosClient.put(`/admin/categories/${id}`, data),
    deleteCategory: (id) => axiosClient.delete(`/admin/categories/${id}`),

    getOrders: () => axiosClient.get('/orders/all'),
    deleteOrder: (id) => axiosClient.delete(`/admin/orders/${id}`),

    getUsers: () => axiosClient.get('/admin/users'),
};

export default adminApi;