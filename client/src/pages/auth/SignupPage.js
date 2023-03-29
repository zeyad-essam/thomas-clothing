import React from "react";
import AuthPage from "../../components/auth/AuthPage";

import { Helmet } from "react-helmet";

const SignupPage = () => {
  return (
    <>
      <Helmet>
        <title>Thomas | Signup</title>
      </Helmet>
      <AuthPage signup />
    </>
  );
};

export default SignupPage;
