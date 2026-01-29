import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// CONTEXT
import { CartProvider } from "./contexts/CartContext";

// LAYOUT
import ClientLayout from "./layouts/ClientLayout";

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

// ADMIN
import AdminLayout from "./pages/admin/AdminLayout";

function App() {
  return (
    <Router>
      {/* ✅ BỌC CART PROVIDER Ở ĐÂY */}
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

          {/* ===== ADMIN ===== */}
          <Route path="/admin/*" element={<AdminLayout />} />

        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
