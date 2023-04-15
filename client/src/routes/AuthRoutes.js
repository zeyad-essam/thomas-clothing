import React from "react";

import { Route, Navigate, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import NewPasswordPage from "../pages/auth/NewPasswordPage";
import PasswordChangedPage from "../pages/auth/PasswordChangedPage";
import AccountPage from "../pages/auth/AccountPage";

const AuthRoutes = () => {
  const userState = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        index
        element={
          !userState.isAuthenticated ? (
            <Navigate to="/auth/account" />
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="account" element={<AccountPage />} />
      <Route
        path="new-password/:userId/:passwordToken"
        element={
          !userState.isAuthenticated ? <NewPasswordPage /> : <Navigate to="/" />
        }
      />
      <Route
        path="new-password/new-password-confirmed"
        element={<PasswordChangedPage />}
      />
    </Routes>
  );
};

export default AuthRoutes;
