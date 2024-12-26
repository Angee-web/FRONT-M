import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import Otp from './Otp'
import Reset from './Reset'
import Confirm from './Confirm'

const Auth = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/input-otp" element={<Otp />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/confirm-reset" element={<Confirm />} />
      </Routes>
    </div>
  );
}

export default Auth