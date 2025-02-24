import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { registerUser, loginUser } from "../api/authApi";

const AuthPage = ({ isSignup = false }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth(); // Access AuthContext

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password complexity
  const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Email Validation
    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Password Validation
    if (!isValidPassword(formData.password)) {
      toast.error("Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character.");
      setLoading(false);
      return;
    }

    // Confirm Password Validation (Signup Only)
    if (isSignup && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      if (isSignup) {
        const newUser = await registerUser(formData);
        toast.success("Account created successfully!");
      } else {
        const loggedInUser = await loginUser({ email: formData.email, password: formData.password });
        setUser(loggedInUser.user);
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full mt-6 md:mt-2">
      <div className="flex flex-col md:flex-row border-2 border-purple-950 rounded-lg shadow-lg md:w-[1000px] h-[600px]">

        {/* Left Side - Image */}
        <div className="w-[500px] h-full hidden md:block">
          <img src="/login.png" alt="Tax Filing Illustration" className="w-full h-full object-cover rounded-l-lg" />
        </div>

        {/* Right Side - Login/Signup Window */}
        <div className="w-full md:w-[500px] h-full flex items-center justify-center p-6 md:p-10 bg-white rounded-r-lg">
          <div className="w-full max-w-[400px]">
            <h2 className="text-3xl font-bold text-purple-950 text-center mb-4">
              {isSignup ? "Create an Account" : "Welcome Back!"}
            </h2>

            <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
              {/* Name Field (Signup Only) */}
              {isSignup && (
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-purple-950 rounded-md bg-white text-black focus:ring-2 focus:ring-purple-950 focus:border-purple-950"
                    required
                  />
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-purple-950 rounded-md bg-white text-black focus:ring-2 focus:ring-purple-950 focus:border-purple-950"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-purple-950 rounded-md bg-white text-black focus:ring-2 focus:ring-purple-950 focus:border-purple-950"
                  required
                />
              </div>

              {/* Confirm Password Field (Signup Only) */}
              {isSignup && (
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-purple-950 rounded-md bg-white text-black focus:ring-2 focus:ring-purple-950 focus:border-purple-950"
                    required
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                disabled={loading}
              >
                {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
              </button>
            </form>

            {/* Switch between Signup and Login */}
            <p className="text-center text-gray-600 mt-4">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <Link to={isSignup ? "/login" : "/signup"} className="text-purple-600 font-semibold ml-2">
                {isSignup ? "Login" : "Sign Up"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
