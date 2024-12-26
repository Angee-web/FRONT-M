import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Notification hook
import { resetPassword } from "@/store/auth-slice";
import { GiPadlock } from "react-icons/gi";

const Reset = () => {
  const dispatch = useDispatch();
  const { toast } = useToast(); // Toast for notifications
  const navigate = useNavigate();

  // Local State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(3);

  // Retrieve email and OTP from localStorage
  const email = localStorage.getItem("resetEmail");
  const otp = localStorage.getItem("resetOtp");
  // console.log("Otp Retrieved:", otp); // Debugging

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Email:", email, "OTP:", otp, "New Password:", newPassword); // Debugging

    if (!email || !otp) {
      toast({
        title: "Error",
        description: "Missing email or OTP.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await dispatch(
        resetPassword({ email, otp, newPassword })
      ).unwrap();
      // console.log("Password Reset Successful:", response); // Add this
      toast({
        title: "Success",
        description: "Password reset successful.",
      });
      setCurrentStep(4);
      navigate("/auth/confirm-reset");
    } catch (err) {
      // console.error("Password Reset Failed:", err);
      toast({
        title: "Error",
        description: err || "Failed to reset password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-shadowTherapy bg-cover bg-center min-h-screen flex justify-center items-center px-4 sm:px-8">
      <div className="shadow-lg backdrop-blur bg-black/30 rounded-2xl w-full max-w-md flex flex-col justify-center items-center py-8 px-6 sm:py-10 sm:px-12">
        <div className="text-center text-white w-full">
          {/* Back to Home */}
          <div className="self-start mb-4">
            <Link to="/" className="flex items-center gap-1 text-xs sm:text-sm">
              <ArrowLeft className="text-xs" />
              <span className="border-b">Home</span>
            </Link>
          </div>

          {/* Lock Icon */}
          <div className="flex justify-center items-center mb-6">
            <GiPadlock className="w-20 h-20 text-white  " />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-2 list-item-text-3">
            Set new password
          </h1>
          <p className="text-sm text-gray-300 mb-6">
            Must be at least 8 characters.
          </p>

          {/* Password Inputs */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />

            {/* Reset Password Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-blue-600 text-white font-medium rounded-full py-2 transition duration-300 hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>
          </form>

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

export default Reset;
