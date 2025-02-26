import React from "react";

import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className="w-full h-screen bg-white m-0 p-0">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16">
        {/* Left Section - Text */}
        <div className="md:w-1/2">
        <h1 className="text-5xl font-bold text-gray-900 ">
  Smart Tax Filing, Maximum Savings!
</h1>
<p className="mt-4 text-gray-600 text-xl font-noto">
Filing taxes has never been easier! Our smart Tax Assistant helps you get the <span className="font-bold">maximum tax savings</span> while making
 the process <span className="font-bold">quick and effortless</span>. No more struggling with complex forms or missing out on deductions. It automatically calculates your tax, applies savings on rent and investments, and even checks your documents for accuracy. With direct access to official records, it pre-fills your tax forms, so you can file in minutes without any confusion. 
 <span className="font-bold">Simple, accurate, and stress-free</span>—just how tax filing should be!

  
  </p>

        </div>

        {/* Right Section - Image */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img src="/image.png" alt="Tax Assistant" className=" max-w-md mx-auto w-[2500px] h-[408px]" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;