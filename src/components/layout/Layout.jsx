import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children, onLogout }) => {
  return (
    <div className="flex min-h-screen bg-gray-light">
      <Sidebar onLogout={onLogout} />
      <div className="flex flex-col flex-1">
        <main className="p-6">{children}</main>
        
      </div>
    </div>
  );
};

export default Layout;
