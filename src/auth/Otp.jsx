import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword, verifyOtp } from "@/store/auth-slice"; // Import the OTP thunk
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Notification hook
import { FaRegEnvelopeOpen } from "react-icons/fa";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast(); // Toast for notifications
  const [currentStep, setCurrentStep] = useState(2);

  // Retrieve email from localStorage
  const email = localStorage.getItem("resetEmail") || "";
  // console.log("Retrieved Email from localStorage:", email); // Debugging

  // Check if email is missing
  if (!email) {
    toast({
      title: "Error",
      description: "No email found. Please restart the password reset process.",
      variant: "destructive",
    });
    navigate("/auth/forgot-password");
  }

  // Handle OTP input changes
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return; // Prevent non-numeric input
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Automatically focus on the next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Handle OTP Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("").trim();

    // console.log("Email Sent to Backend:", email);
    // console.log("OTP Sent to Backend:", otpCode);

    if (otpCode.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 4-digit OTP.",
        variant: "destructive",
      });
      return;
    }

    dispatch(verifyOtp({ email, otp: otpCode }))
      .unwrap()
      .then((res) => {
        // console.log("OTP Verification Response:", res);
        localStorage.setItem("resetOtp", otpCode);
        toast({
          title: "Success",
          description: res.message || "OTP Verified Successfully!",
        });
        setCurrentStep(3);
        navigate("/auth/reset-password");
      })
      .catch((error) => {
        // console.error("OTP Verification Error:", error);
        toast({
          title: "Error",
          description: error?.message || "Invalid or expired OTP!",
          variant: "destructive",
        });
      });
  };


  // Handle OTP resend
  const handleResendOtp = () => {
    if (!email) {
      toast({
        title: "Error",
        description: "No email address found to resend OTP.",
        variant: "destructive",
      });
      return;
    }

    dispatch(forgotPassword(email))
      .unwrap()
      .then((res) => {
        toast({
          title: "Success",
          description: res.message || "OTP resent successfully!",
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error?.message || "Failed to resend OTP.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="bg-shadowTherapy bg-cover bg-center min-h-screen flex justify-center items-center px-4 sm:px-8">
      <div className="shadow-lg backdrop-blur bg-black/30 rounded-2xl w-full max-w-lg lg:max-w-2xl flex flex-col justify-center items-center py-8 px-6 sm:py-10 sm:px-12">
        <div className="text-center text-white flex flex-col items-center w-full">
          {/* Back to Home */}
          <div className="self-start mb-4">
            <Link to="/" className="flex items-center gap-1 text-xs sm:text-sm">
              <ArrowLeft className="text-xs" />
              <span className="border-b">Home</span>
            </Link>
          </div>

          {/* Icon */}
          <div className="flex justify-center items-center">
            <FaRegEnvelopeOpen className="w-14 h-14" />
          </div>

          {/* Title */}
          <h1 className="lg:text-3xl text-xl font-bold tracking-tight text-white mx-10 mt-5 list-item-text-3">
            Password Reset
          </h1>
          <p className="text-white text-sm mt-2 mb-5">
            Enter the 4-digit code sent to <br /> {email}
          </p>

          {/* OTP Input Form */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleOtpChange(index, e.target.value.trim())
                  }
                  className="w-12 h-12 text-center rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-black"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-blue-600 text-white font-medium rounded-full py-2 transition duration-300 hover:opacity-90"
            >
              Continue
            </button>
          </form>

          {/* Resend Code */}
          <p className="text-xs text-gray-300 mt-4">
            Didn’t receive the email?{" "}
            <button
              onClick={handleResendOtp}
              className="text-white underline hover:opacity-90"
            >
              Click to resend
            </button>
          </p>

          {/* Back to Login */}
          <div className="mt-4 flex items-center justify-center">
            <ArrowLeft className="text-xs" />
            <Link
              to="/auth/login"
              className="text-sm text-white hover:underline"
            >
              <span> Back to log in</span>
            </Link>
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
    </div>
  );
};

export default Otp;
