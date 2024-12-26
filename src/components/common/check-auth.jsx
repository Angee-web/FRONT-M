// import React, { useEffect } from "react";
// import { Navigate, useLocation } from "react-router-dom";


// const CheckAuth = ({ isAuthenticated, user, children }) => {
//   const location = useLocation();

//   // UseEffect to save the last attempted URL for unauthenticated users
//   useEffect(() => {
//     if (!isAuthenticated) {
//       localStorage.setItem("lastAttemptedUrl", location.pathname);
//     }
//   }, [isAuthenticated, location.pathname]);

//   // Check for unauthenticated access to protected routes
//   if (
//     !isAuthenticated &&
//     ![
//       "/auth/login",
//       "/auth/register",
//       "/auth/forgot-password",
//       "/auth/input-otp",
//       "/auth/reset-password",
//       "/auth/confirm-reset",
//     ].includes(location.pathname) // Use exact path matching
//   ) {
//     return <Navigate to="/auth/login" />;
//   }

//   // Handle authenticated access
//   if (isAuthenticated) {
//     // Redirect authenticated users away from authentication pages
//     if (
//       [
//         "/auth/login",
//         "/auth/register",
//         "/auth/forgot-password",
//         "/auth/input-otp",
//         "/auth/reset-password",
//         "/auth/confirm-reset",
//       ].includes(location.pathname)
//     ) {
//       const lastAttemptedURL = localStorage.getItem("lastAttemptedURL");
//       if (user?.role === "admin") {
//         return <Navigate to="/admin/dashboard" />;
//       } else {
//         return <Navigate to={lastAttemptedURL || "/therapy"} replace />;
//       }
//     }
//   }

//   // Check if a non-admin user is trying to access admin pages
//   if (
//     isAuthenticated &&
//     user?.role !== "admin" &&
//     location.pathname.includes("/admin")
//   ) {
//     return <Navigate to="/unauth-page" />;
//   }

//   // Check if an admin user is trying to access non-admin pages
//   if (
//     isAuthenticated &&
//     user?.role === "admin" &&
//     location.pathname.includes("/therapy")
//   ) {
//     return <Navigate to="/admin/dashboard" />;
//   }

//   return <div>{children}</div>;
// };

// export default CheckAuth;


import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckAuth = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();

  // Define public routes
  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/input-otp",
    "/auth/reset-password",
    "/auth/confirm-reset",
  ];

  // Prevent premature redirects
  if (isLoading) {
    return <div>Loading...</div>; // Replace with a proper loader or skeleton
  }

  // Save last attempted URL for unauthenticated users
  useEffect(() => {
    if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
      localStorage.setItem("lastAttemptedUrl", location.pathname);
    }
  }, [isAuthenticated, location.pathname, publicRoutes]);

  // Redirect unauthenticated users accessing protected routes
  if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect authenticated users away from auth pages
  if (
    isAuthenticated &&
    publicRoutes.slice(1).includes(location.pathname) // Exclude "/" (home page)
  ) {
    const lastAttemptedURL = localStorage.getItem("lastAttemptedUrl");
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to={lastAttemptedURL || "/therapy"} replace />;
  }

  // Handle role-based route restrictions
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.startsWith("/therapy")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>; // Render children for valid routes
};

export default CheckAuth;
