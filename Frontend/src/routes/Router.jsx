import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { LoginPage, SignupPage, ForgotPasswordPage } from "../modules/auth";
import ProfilePage from "../modules/profile/ProfilePage";
import EditProfilePage from "../modules/profile/EditProfilePage";
import HomePage from "../modules/home/home";
import CommingSoon from "../components/commingsoon";
import VehicleRegistration from "../modules/vehicle/vehicleRegistration"; 
import VehicleProfilePage from "../modules/vehicle/vehicleProfile";
import VehicleProfileDetails from "../modules/vehicle/vehicleProfiledetails";
import SupportRoutes from "../modules/routes/SupportRoutes";
import SettingsPage from "../modules/settings/SettingsPage";

import Layout from "../layout";
import PrivateRoute from "./PrivateRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (No Header/Footer) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/coming-soon" element={<CommingSoon />} />

        {/* Protected routes WITH Layout (Header / Footer included) */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Vehicle Routes */}
          <Route path="/vehicle-registration" element={<VehicleRegistration />} />
          <Route path="/vehicles" element={<VehicleProfilePage />} />
          <Route path="/vehicle-D" element={<VehicleProfileDetails />} />
        </Route>

        {/* Support Routes WITHOUT main Layout (Dedicated Support Layout inside SupportRoutes) */}
        <Route
          path="/support/*"
          element={
            <PrivateRoute>
              <SupportRoutes />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}