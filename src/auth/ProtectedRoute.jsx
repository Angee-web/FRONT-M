import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    // Save the last attempted route
    const currentRoute = window.location.pathname;
    localStorage.setItem("lastAttemptedURL", currentRoute);

    // Allow access only to authentication-related pages
    const publicRoutes = [
      "/", // Home page
      "/auth/reset-password",
      "/auth/otp",
      "/auth/verify-email",
      "/auth/verify-otp",
      "/auth/logout",
      "/auth/confirm-email",
      "/auth/change-password",
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",

    ];

    if (!publicRoutes.includes(currentRoute)) {
      return <Navigate to="/auth/login" replace />;
    }

    // return <Navigate to="/auth/login" replace />;
  }

  return children; // Render the child components if authenticated
};

export default ProtectedRoute;


// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

//   // Show a loading state while authentication is being checked
//   if (isLoading) {
//     return <div>Loading...</div>; // Replace with a proper loader or skeleton if desired
//   }

//   // Redirect unauthenticated users to login
//   if (!isAuthenticated) {
//     const currentRoute = window.location.pathname;
//     localStorage.setItem("lastAttemptedURL", currentRoute);

//     return <Navigate to="/auth/login" replace />;
//   }

//   return children; // Render children if authenticated
// };

// export default ProtectedRoute;
