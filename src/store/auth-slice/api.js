import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_BASE_URL="https://server-xbzz.onrender.com"

// const API_BASE_URL = "http://localhost:5000";



const api = axios.create({
  baseURL: `${API_BASE_URL}/api`, // Base URL for API requests
  headers: {
    "Content-Type": "application/json", // Default header for JSON requests
  },
  withCredentials: true, // Include cookies and sessions
});

// Request Interceptor: Automatically attach the token to headers
// api.interceptors.request.use(


//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
//     }
//     return config;
//   },
//   (error) => {
//     // Handle errors in the request configuration
//     return Promise.reject(error);
//   }
// );

// Response Interceptor: Handle errors globally, such as expired tokens
// api.interceptors.response.use(
//   (response) => response, // Return the response if successful
//   (error) => {
//     if (error.response) {
//       // Handle 401 Unauthorized errors (expired token or missing token)
//       if (error.response.status === 401) {
//         localStorage.removeItem("token"); // Remove the expired token

//         // // Redirect to the login page unless already on the login page
//         // if (window.location.pathname !== "/auth/login") {
//         //   window.location.href = "/auth/login"; // Redirect to login
//         // }
//       }

//       // Handle other HTTP errors (e.g., 403, 404, 500)
//       if (error.response.status === 403) {
//         console.error("You do not have permission to access this resource.");
//       } else if (error.response.status === 404) {
//         console.error("The requested resource was not found.");
//       } else if (error.response.status >= 500) {
//         console.error("A server error occurred. Please try again later.");
//       }
//     } else {
//       // Handle network errors or other unexpected issues
//       console.error("An unexpected error occurred:", error.message);
//     }

//     return Promise.reject(error); // Reject the promise to propagate the error
//   }
// );

export default api;
