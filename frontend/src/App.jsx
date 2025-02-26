import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import { useAuth } from "./context/AuthContext"; // Import auth context
import DocumentUpload from "./pages/DocumentUpload";
function App() {
  const { user } = useAuth(); // Get user state from context

  return (
    <div className="m-0 p-0">
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage isSignup={false} />} />
          <Route path="/signup" element={<AuthPage isSignup={true} />} />

          {/* Protected Route (Commented out for now) */}
          {/* {user ? <Route path="/dashboard" element={<Dashboard />} /> : <Route path="/login" />} */}
          <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/document-upload" element={<DocumentUpload />} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
