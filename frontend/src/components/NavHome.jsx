import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import logo from "../assets/logo.png"; // Ensure correct path

const NavHome = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-purple-950 text-white shadow-lg transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* White Background Around Logo */}
        <div className="bg-white flex items-center justify-center py-3">
          {isOpen && <img src={logo} alt="Logo" className="h-14 w-auto" />}
        </div>

        {/* Sidebar Links */}
        <nav className="mt-4">
          {[
            { name: "Document Upload", path: "/document-upload" },
            { name: "Income Details", path: "/income-info" },
            { name: "Employment Details", path: "/employment-details" },
            { name: "Tax Calculations", path: "/tax-calculations" },
            { name: "Personal Information", path: "/personal-information" },
            { name: "Home", path: "/" },
            { name: "Logout", path: "/" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block py-3 px-6 text-lg font-medium text-white transition duration-300 hover:bg-white/20 backdrop-blur-md"
              >
              {isOpen ? item.name : item.name[0]}
            </Link>
          ))}
        </nav>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-purple-800 text-white p-2 rounded-full shadow-lg"
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
    </div>
  );
};

export default NavHome;
