import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { forgotPassword } from "@/store/auth-slice";
import { GiPadlockOpen } from "react-icons/gi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }


    dispatch(forgotPassword(email)).then((data) => {
      if (data?.payload?.success) {
        // Save email and OTP in localStorage
        localStorage.setItem("resetEmail", email);
        localStorage.setItem("resetOtp", data.payload.otp);

        toast({
          title: "Success",
          description: "Password reset instructions sent to your email.",
        });

        setCurrentStep(2);
        navigate("/auth/input-otp");
      } else {
        toast({
          title: "Error",
          description: data?.payload?.message || "Unable to reset password.",
          variant: "destructive",
        });
      }
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

          {/* Logo */}
          {/* <img
            src="https://www.shutterstock.com/image-vector/rotation-locked-icon-vector-illustration-260nw-1921951472.jpg"
            alt="forgot-password"
            className="w-20 h-20 sm:w-15 sm:h-15 lg:w-28 lg:h-28 mb-4 rounded-full border-4 border-white bg-white object-cover"
          /> */}
          <GiPadlockOpen  className="w-20 h-20"/>

          {/* Title */}
          <h1 className="text-xl sm:text-3xl lg:text-3xl font-bold tracking-tight mt-4 list-item-text-3">
            Forgotten Password?
          </h1>
          <p className="text-sm sm:text-base text-white mt-2">
            No worries, we’ll send your reset instructions.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full mt-6 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              className="w-full px-4 py-2 text-sm sm:text-base rounded-full bg-white/30 focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-white"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-blue-600 text-white font-medium rounded-full py-2 text-sm sm:text-base transition duration-300 hover:opacity-90"
            >
              Reset password
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-4 flex items-center justify-center">
            <ArrowLeft className="text-xs sm:text-sm" />
            <Link
              to="/auth/login"
              className="text-sm sm:text-base text-white hover:underline"
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

export default ForgotPassword;
