import React from "react";
import TopbarContent from "../components/TopbarContent";

const Dashboard = ({ onLogout }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div>
      <div className="flex justify-between items-center border">
        <TopbarContent />
      </div>

      {/* Konten utama dashboard */}
      <div className="bg-white p-6 rounded shadow">
        <p className="text-gray-700">
          Selamat datang, <strong>{user?.name || "User"}</strong>!
        </p>
        <p className="mt-2 text-gray-500">
          Ini adalah halaman dashboard utama POS Camping.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
