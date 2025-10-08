import React from "react";
import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";

const Layout = ({ children, onLogout }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar onLogout={onLogout} />
      <div className="flex flex-col flex-1">
        {/* <Topbar onLogout={onLogout} /> */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
