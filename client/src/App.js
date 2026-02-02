import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// CONTEXT
import { CartProvider } from "./contexts/CartContext";

// LAYOUT
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./pages/admin/AdminLayout";

// PROTECTED ROUTE (Tạm thời không dùng để test giao diện)
// import ProtectedRoute from "./components/ProtectedRoute";

// COMPONENT AI CHATBOX
import AIChatbox from "./components/AIChatbox";

// CLIENT PAGES
import HomePage from "./pages/HomePage";
import BMIPage from "./pages/BMIPage";
import BloodPressurePage from "./pages/BloodPressurePage";
import BMRTDEEPage from "./pages/BMRTDEEPage";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import BlogDetailPage from "./pages/BlogDetailPage";
import Profile from "./pages/Profile";
import CartPage from "./pages/CartPage";

// AUTH
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductManager from "./pages/admin/ProductManager";
import OrderManager from "./pages/admin/OrderManager";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          {/* ===== AUTH (KHÔNG HEADER / FOOTER) ===== */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ===== CLIENT (CÓ HEADER / FOOTER) ===== */}
          <Route element={<ClientLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/bmi" element={<BMIPage />} />
            <Route path="/blood-pressure" element={<BloodPressurePage />} />
            <Route path="/bmr-tdee" element={<BMRTDEEPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>

          {/* ===== ADMIN (ĐÃ BỎ PROTECTED ROUTE ĐỂ TEST) ===== */}
          {/* Sửa lại: Gỡ bỏ ProtectedRoute và chỉnh path cha là /admin */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Index Route: Khi vào /admin sẽ tự nhảy sang /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="orders" element={<OrderManager />} />
          </Route>

        </Routes>

        {/* ✅ CHÈN CHATBOX AI HIỆN TRÊN TOÀN BỘ WEBSITE */}
        <AIChatbox />

      </CartProvider>
    </Router>
  );
}

export default App;