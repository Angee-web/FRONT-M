import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { IoMdCheckboxOutline } from "react-icons/io";

const Confirm = () => {
  const [currentStep, setCurrentStep] = useState(4); // Initial step is set to 4
  const navigate = useNavigate(); // This will be used to navigate to login

  const handleBackToLogin = () => {
    navigate("/auth/login"); // Manually navigate to the login page when the user clicks
  };

  return (
    <div className="bg-shadowTherapy bg-cover bg-center min-h-screen flex justify-center items-center px-4 sm:px-8">
      {/* Outer Container */}
      <div className="shadow-lg backdrop-blur bg-black/30 rounded-2xl w-full max-w-md flex flex-col justify-center items-center py-8 px-6 sm:py-10 sm:px-12">
        {/* Home Link */}
        <div className="self-start mb-4 w-full">
          <Link
            to="/"
            className="flex items-center gap-1 text-xs sm:text-sm text-white"
          >
            <ArrowLeft className="text-xs" />
            <span className="border-b">Home</span>
          </Link>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center w-full">
          {/* Success Icon */}
          {/* <div className="bg-white rounded-full p-3 mb-4 shadow-md">
            <div className="w-10 h-10 flex items-center justify-center text-black text-2xl font-bold">
              &#10004;
            </div>
          </div> */}

          <IoMdCheckboxOutline className="w-24 h-24 text-white rounded-full" />

          {/* Password Reset Message */}
          <h1 className="text-white text-2xl sm:text-3xl font-semibold mb-2 list-item-text-3 text-center">
            Password reset successfully
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm mb-6 text-center">
            Log into your account with your new password
          </p>

          {/* Done Button */}
          <button
            onClick={handleBackToLogin}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium py-2 rounded-md shadow-md hover:opacity-90 transition duration-300"
          >
            Done
          </button>

          {/* Back to Login Link */}
          <button
            onClick={handleBackToLogin} // Handle the redirect when clicked
            className="mt-4 text-xs sm:text-sm text-gray-300 hover:text-white transition"
          >
            &larr; Back to log in
          </button>
        </div>

        {/* Step Progress Tracker */}
        <div className="flex justify-center items-center gap-4 mt-6">
          {["1", "2", "3", "4"].map((step, index) => (
            <div
              key={index}
              className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-sm sm:text-base font-bold ${
                currentStep === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Confirm;
