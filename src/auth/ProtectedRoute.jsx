import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    console.log("Accessing route:", window.location.pathname);
    console.log("Redirecting to login...");
  }


  // Redirect unauthenticated users
 if (!isAuthenticated) {
   const currentRoute = window.location.pathname;
   localStorage.setItem("lastAttemptedURL", currentRoute);

   // Public routes
   const publicRoutes = [
     "/", // Home page should remain accessible
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
