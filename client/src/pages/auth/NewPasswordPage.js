import React from "react";

import NewPassword from "../../components/auth/NewPassword";

import { Helmet } from "react-helmet";

const NewPasswordPage = () => {
  return (
    <>
      <Helmet>
        <title>Thomas | New Password</title>
      </Helmet>
      <NewPassword />
    </>
  );
};

export default NewPasswordPage;
