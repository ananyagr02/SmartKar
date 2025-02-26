
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Ensure correct path

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full bg-transparent px-6 md:px-12 py-4">
      {/* Logo - Moved Slightly Left */}
      <div className="flex-1 ml-4">
        <img src={logo} alt="Logo" className="h-[60px] w-[160px]" />
      </div>

      {/* Navigation Links - Moved Closer to Get Started */}
      <div className="flex flex-1 justify-end space-x-28 mr-28"> 
        {["Home", "About"].map((item, index) => (
          <Link
            key={index}
            to={item === "Home" ? "/" : "/about"}
            style={{
              textDecoration: "none",
              display: "inline-block",
              position: "relative",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "black",
              cursor: "pointer",
              paddingBottom: "4px", // Prevents text jumping when underline appears
            }}
            onMouseEnter={(e) => {
              const underline = e.target.querySelector(".underline-span");
              underline.style.width = "100%";
              underline.style.left = "0";
            }}
            onMouseLeave={(e) => {
              const underline = e.target.querySelector(".underline-span");
              underline.style.width = "0";
              underline.style.left = "50%";
            }}
          >
            {item}
            <span
              className="underline-span"
              style={{
                display: "block",
                height: "2px",
                width: "0",
                position: "absolute",
                bottom: "0",
                left: "50%",
                background: "#4a148c", // Changed to purple-dark-950
                transition: "width 0.3s ease, left 0.3s ease",
              }}
            ></span>
          </Link>
        ))}
      </div>

      {/* Get Started Button - Adjusted Position */}
      <div className="mr-10"> 
        <Link
          to="/login"
          style={{
            backgroundImage:
              "linear-gradient(to right, #2c0f4a 0%, #b36ce6 51%, #d0aee8 100%)",
            padding: "10px 30px",
            textAlign: "center",
            transition: "background-position 0.5s ease, background-size 0.5s ease",
            backgroundSize: "200% auto",
            color: "white",
            borderRadius: "30px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500",
            display: "inline-block",
            textDecoration: "none",
          }}
          onMouseOver={(e) => (e.target.style.backgroundPosition = "right center")}
          onMouseOut={(e) => (e.target.style.backgroundPosition = "left center")}
        >
          Get Started!
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
