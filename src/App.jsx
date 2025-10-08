import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Products from "./pages/Products";
import Branch from "./pages/Branch";
import Reports from "./pages/Reports";
import StockOpname from "./pages/StockOpname";
import Users from "./pages/Users";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
  };

  // Jika belum login → tampilkan halaman login saja
  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  // Jika sudah login → tampilkan layout + routes
  return (
    <Router>
      <Layout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard onLogout={handleLogout} />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/products" element={<Products />} />
          <Route path="/branch" element={<Branch />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/stock-opname" element={<StockOpname />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
