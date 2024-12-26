import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TeenButton = ({ text }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleBookingClick = () => {
    if (isAuthenticated) {
      navigate("/therapy/appointment/teen"); // Navigate directly
    } else {
      localStorage.setItem("intendedRoute", "/therapy/appointment/teen"); // Save intended route
      navigate("/auth/login"); // Redirect to login
    }
  };

  return (
    <button
      className="relative rounded-full bg-white text-black mt-2 py-1 px-6 lg:px-4 font-semibold text-center overflow-hidden"
      style={{
        border: "2px solid transparent",
        backgroundImage:
          "linear-gradient(white, white), linear-gradient(to right, pink, blue, pink, blue, pink, blue)",
        backgroundClip: "padding-box, border-box",
        borderImage:
          "linear-gradient(to right, pink, blue, pink, blue, pink, blue) 1",
      }}
      onClick={handleBookingClick}
    >
      {text}
    </button>
  );
};

export default TeenButton;
