import React from "react";
import PasswordChanged from "../../components/auth/PasswordChanged";

import { Helmet } from "react-helmet";

const PasswordChangedPage = () => {
  return (
    <>
      <Helmet>
        <title>Thomas | Password Changed</title>
      </Helmet>
      <PasswordChanged />
    </>
  );
};

export default PasswordChangedPage;
