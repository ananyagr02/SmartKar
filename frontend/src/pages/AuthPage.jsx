import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { registerUser, loginUser } from "../api/authApi";

const AuthPage = ({ isSignup = false }) => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Use login instead of setUser

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    phoneNumber: "",
    panNumber: "",
    aadharNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate email format
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validate password complexity
  const isValidPassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email.");
      setLoading(false);
      return;
    }

    if (!isValidPassword(formData.password)) {
      toast.error("Password must have 8+ chars, 1 uppercase, 1 number, 1 special char.");
      setLoading(false);
      return;
    }

    if (isSignup && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      if (isSignup) {
        await registerUser(formData);
        toast.success("Account created successfully!");
        navigate("/login");
      } else {
        const loggedInUser = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        console.log("🔹 Login Response:", loggedInUser);

        if (!loggedInUser || !loggedInUser.token) {
          throw new Error("Invalid login response from server.");
        }

        // ✅ Use login function from AuthContext
        login(loggedInUser.user, loggedInUser.token);

        toast.success("Login successful!");
        console.log("🔹 Navigating to /dashboard...");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("❌ Login/Register Error:", error);
      toast.error(error.message || "An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full mt-6 md:mt-2">
      <div className="flex flex-col md:flex-row border-2 border-purple-950 rounded-lg shadow-lg md:w-[1000px] h-[700px]">
        <div className="w-[500px] h-full hidden md:block">
          <img src="/login.png" alt="Tax Filing Illustration" className="w-full h-full object-cover rounded-l-lg" />
        </div>

        <div className="w-full md:w-[500px] h-full flex items-center justify-center p-6 md:p-10 bg-white rounded-r-lg">
          <div className="w-full max-w-[400px]">
            <h2 className="text-3xl font-bold text-purple-950 text-center mb-4">
              {isSignup ? "Create an Account" : "Welcome Back!"}
            </h2>

            <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
              {isSignup && (
                <>
                  <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
                  <InputField label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange} />
                  <InputField label="Phone Number" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                  <InputField label="PAN Number" name="panNumber" value={formData.panNumber} onChange={handleChange} />
                  <InputField label="Aadhar Number" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} />
                </>
              )}

              <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
              <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
              
              {isSignup && <InputField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />}

              <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition" disabled={loading}>
                {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
              </button>
            </form>

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

const InputField = ({ label, type = "text", name, value, onChange }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-purple-950 rounded-md bg-white text-black focus:ring-2 focus:ring-purple-950 focus:border-purple-950"
      required
    />
  </div>
);

export default AuthPage;
