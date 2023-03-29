import React from "react";
import AuthPage from "../../components/auth/AuthPage";

import { Helmet } from "react-helmet";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Thomas | Login</title>
      </Helmet>
      <AuthPage />
    </>
  );
};

export default LoginPage;
