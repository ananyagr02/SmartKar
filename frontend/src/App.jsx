import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage'; 
import AuthPage from './pages/AuthPage'; 
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className='m-0 p-0'>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage isSignup={false} />} />
          <Route path="/signup" element={<AuthPage isSignup={true} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
