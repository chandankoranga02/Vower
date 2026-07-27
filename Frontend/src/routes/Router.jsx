import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../modules/auth/login";
import ProfilePage from "../modules/profile/ProfilePage";
import EditProfilePage from "../modules/profile/EditProfilePage";
<<<<<<< HEAD
import Signup from "../modules/auth/Signup";
import ForgotPasswordPage from "../modules/auth/components/Forgetpassword";
=======
import HomePage from "../modules/home/home";
import Layout from "../layout.jsx"
>>>>>>> c40c12e (Successfully added Header and Footer in all Pages and with a good home page)

export default function Router() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
=======
      
        {/* Auth routes */}
        <Routes>
        <Route path="/" element={<Layout />} >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* App routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />

        {/* Catch-all: redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
>>>>>>> c40c12e (Successfully added Header and Footer in all Pages and with a good home page)
      </Routes>
    </BrowserRouter>
  );
}
