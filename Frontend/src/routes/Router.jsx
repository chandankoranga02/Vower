import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../modules/auth/login";
import ProfilePage from "../modules/profile/ProfilePage";
import EditProfilePage from "../modules/profile/EditProfilePage";
import Signup from "../modules/auth/Signup";
import ForgotPasswordPage from "../modules/auth/components/Forgetpassword";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}