// TherapyDashboard.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Therapy from "./therapy/Therapy";
import TeenTherapy from "./therapy/teen/TeenTherapy";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/TherapyNavbar";
import ProtectedRoute from "@/auth/ProtectedRoute";
import TherapistDetails from "./therapy/TherapistDetails";
import TherapistInfo from "./therapy/Test";
import TeenPage from "./therapy/teen/TeenPage";
import TherapistCreation from "./admin-view/therapycreation/TherapistView";
import Current from "./therapy/bookings/Current";
import ScrollToTop from "./ScrollToTop";



const TherapyDashboard = () => {
  return (
    <div>
      <ScrollToTop />
      <div>
        <Navbar />
        <div className="mt-[3rem] lg:mt-[10rem] md:mt-[5rem]">
          <Routes>
            {/* Public Route for Therapy Landing Page */}
            {/* <Route path="/" element={<LandingPage />} /> */}

            {/* Protected Therapy Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Therapy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointment/teen"
              element={
                <ProtectedRoute>
                  <TeenPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teenAppointment"
              element={
                <ProtectedRoute>
                  <TeenTherapy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/therapist-details/:id"
              element={<TherapistDetails />}
            />
            <Route path="/testpage" element={<TherapistInfo />} />
            <Route path="/upload" element={<TherapistCreation />} />
            {/* <Route path="/bookings" element={<ModalComponent />} /> */}
            <Route path="/scheduling/*" element={<Current />} />
           
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TherapyDashboard;
