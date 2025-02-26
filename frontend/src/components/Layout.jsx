import React from "react";
import { Outlet } from "react-router-dom";
import NavHome from "../components/NavHome"; // Ensure the correct path

const DashboardLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <NavHome />

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <Outlet /> {/* This will render the page content */}
      </div>
    </div>
  );
};

export default DashboardLayout;
