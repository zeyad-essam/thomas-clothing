import React from "react";
import { useSelector } from "react-redux";

import { Helmet } from "react-helmet";
import PageHeader from "../../components/UI/PageHeader";

import AccountDetails from "../../components/auth/AccountDetails";

const AccountPage = () => {
  const userState = useSelector((state) => state.user);
  return (
    <>
      <Helmet>
        <title>Thomas | Account</title>
      </Helmet>
      <PageHeader
        title={`Welcome, ${
          userState.isAuthenticated ? userState.userData.username : ""
        }`}
      />
      <AccountDetails />
    </>
  );
};

export default AccountPage;
