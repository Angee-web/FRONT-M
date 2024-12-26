import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  // Save the last attempted URL for unauthenticated users
  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/auth/login") {
      localStorage.setItem("lastAttemptedUrl", location.pathname);
    }
  }, [isAuthenticated, location.pathname]);

  // Handle unauthenticated users trying to access protected routes
  const protectedRoutes = [
    "/admin",
    "/shop",
    "/therapy",
    // Add other protected routes here
  ];

  if (
    !isAuthenticated &&
    protectedRoutes.some((path) => location.pathname.startsWith(path))
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect authenticated users away from auth-related pages
  if (isAuthenticated) {
    if (location.pathname.startsWith("/auth")) {
      const lastAttemptedURL = localStorage.getItem("lastAttemptedUrl");
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
      }
      return <Navigate to={lastAttemptedURL || "/therapy"} replace />;
    }

    // Restrict non-admin users from admin routes
    if (user?.role !== "admin" && location.pathname.startsWith("/admin")) {
      return <Navigate to="/unauth-page" replace />;
    }

    // Restrict admin users from non-admin routes
    if (user?.role === "admin" && !location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  // Allow access to public and protected content
  return <div>{children}</div>;
};

export default CheckAuth;

// import React, { useEffect } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

// const CheckAuth = ({ children }) => {
//   const { isAuthenticated, user, isLoading } = useSelector(
//     (state) => state.auth
//   );
//   const location = useLocation();

//   // Define public routes
//   const publicRoutes = [
//     "/",
//     "/auth/login",
//     "/auth/register",
//     "/auth/forgot-password",
//     "/auth/input-otp",
//     "/auth/reset-password",
//     "/auth/confirm-reset",
//   ];

//   // Prevent premature redirects
//   if (isLoading) {
//     return <div>Loading...</div>; // Replace with a proper loader or skeleton
//   }

//   // Save last attempted URL for unauthenticated users
//   useEffect(() => {
//     if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
//       localStorage.setItem("lastAttemptedUrl", location.pathname);
//     }
//   }, [isAuthenticated, location.pathname, publicRoutes]);

//   // Redirect unauthenticated users accessing protected routes
//   if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
//     return <Navigate to="/auth/login" />;
//   }

//   // Redirect authenticated users away from auth pages
//   if (
//     isAuthenticated &&
//     publicRoutes.slice(1).includes(location.pathname) // Exclude "/" (home page)
//   ) {
//     const lastAttemptedURL = localStorage.getItem("lastAttemptedUrl");
//     if (user?.role === "admin") {
//       return <Navigate to="/admin/dashboard" replace />;
//     }
//     return <Navigate to={lastAttemptedURL || "/therapy"} replace />;
//   }

//   // Handle role-based route restrictions
//   if (
//     isAuthenticated &&
//     user?.role !== "admin" &&
//     location.pathname.startsWith("/admin")
//   ) {
//     return <Navigate to="/unauth-page" />;
//   }

//   if (
//     isAuthenticated &&
//     user?.role === "admin" &&
//     location.pathname.startsWith("/therapy")
//   ) {
//     return <Navigate to="/admin/dashboard" />;
//   }

//   return <>{children}</>; // Render children for valid routes
// };

// export default CheckAuth;
