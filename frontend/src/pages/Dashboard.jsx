import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaListAlt, FaFileUpload } from "react-icons/fa"; // Icons for the steps

const Dashboard = () => {
  const [step, setStep] = useState(1); // Track the current step

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex flex-col items-center px-6 py-12">
        {/* Title */}
        <h1 className="text-4xl font-semibold text-gray-800">Welcome to Your Tax Filing Dashboard</h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl text-center">
          Follow the steps below to complete your tax filing process. We'll guide you through each part to make sure everything is correctly filled out.
        </p>

        {/* Steps Overview */}
        <div className="mt-8 flex justify-between w-full max-w-4xl">
          <div className="flex flex-col items-center">
            <div
              className={`cursor-pointer p-4 rounded-lg ${step === 1 ? "bg-purple-600 text-white" : "bg-gray-200"}`}
              onClick={() => setStep(1)}
            >
              <FaUser className="text-3xl mb-2" />
              <p className="font-medium">Step 1: Income Information</p>
            </div>
            <p className="text-sm text-center mt-2">Enter your income details to begin.</p>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`cursor-pointer p-4 rounded-lg ${step === 3 ? "bg-purple-600 text-white" : "bg-gray-200"}`}
              onClick={() => setStep(3)}
            >
              <FaFileUpload className="text-3xl mb-2" />
              <p className="font-medium">Step 2: Upload Documents</p>
            </div>
            <p className="text-sm text-center mt-2">Upload your required documents to complete the process.</p>
          </div>
        </div>

          <div className="flex flex-col items-center">
            <div
              className={`cursor-pointer p-4 rounded-lg ${step === 2 ? "bg-purple-600 text-white" : "bg-gray-200"}`}
              onClick={() => setStep(2)}
            >
              <FaListAlt className="text-3xl mb-2" />
              <p className="font-medium">Step 3: Employment Details</p>
            </div>
            <p className="text-sm text-center mt-2">Provide your job details for accurate tax calculations.</p>
          </div>

        {/* Step Details */}
        <div className="mt-12 w-full max-w-4xl text-center">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold">Step 1: Enter Your Income Information</h2>
              <p className="text-lg text-gray-600 mt-4">
                We need your the details such as financial year, salary income, capital gains, business income,rental income etc to begin the tax calculation process              
                  
              </p>
              <Link
                to="/income-info"
                className="mt-4 inline-block bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold py-2 px-6 rounded-lg"
              >
                Proceed to Income Info
              </Link>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold">Step 2: Enter Your Employment Details</h2>
              <p className="text-lg text-gray-600 mt-4">
                Enter your employment information, including salary and deductions, to calculate your eligible tax savings.
              </p>
              <Link
                to="/employment-details"
                className="mt-4 inline-block bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold py-2 px-6 rounded-lg"
              >
                Proceed to Employment Info
              </Link>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold">Step 3: Upload Your Documents</h2>
              <p className="text-lg text-gray-600 mt-4">
                Upload the necessary documents like your Form 16, Salary Slips, and other proof of income to finalize the filing.
              </p>
              <Link
                to="/upload-documents"
                className="mt-4 inline-block bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold py-2 px-6 rounded-lg"
              >
                Proceed to Upload Documents
              </Link>
            </div>
          )}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 w-full max-w-4xl text-center text-gray-600">
          <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
          <p className="mb-4">
            If you need assistance at any point, feel free to reach out to our support team or consult the FAQ section.
          </p>
          <Link
            to="/help"
            className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold py-2 px-6 rounded-lg"
          >
            Visit Help Center
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
