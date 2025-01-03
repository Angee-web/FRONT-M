// App.jsx
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TherapyDashboard from "./pages/TherapyDashboard";
import Auth from "./auth/Auth";
import Admin from "./pages/admin-view/Admin";
import Shopping from "./pages/shopping-view/Shopping";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollToTop from "./pages/ScrollToTop";
import ProtectedRoute from "./auth/ProtectedRoute";
import LandingPage from "./pages/landing-page/LandingPage";
import Dashboard from './pages/Dashboard';

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

 useEffect(() => {
   dispatch(checkAuth());
 }, [dispatch]);


  if (isLoading) {
    return <Skeleton className="max-w-md h-auto rounded-full" />;
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <ScrollToTop />
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />
        

        {/* Other routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/therapy/*" element={<TherapyDashboard />} />
        <Route
          path="/auth/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Auth />
            </CheckAuth>
          }
        />
        <Route
          path="/admin/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Admin />
            </CheckAuth>
          }
        />
        <Route
          path="/shop/*"
          element={
            <ProtectedRoute>
              <Shopping />
            </ProtectedRoute>
          }
        />
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
