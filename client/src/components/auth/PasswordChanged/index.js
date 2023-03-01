import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { logoutHandler } from "../../../utils/auth";

import classes from "./PasswordChanged.module.css";
import PageLoading from "../../UI/PageLoading";

const PasswordChanged = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.isLoading) {
      return;
    }
    if (!userState.isAuthenticated) {
      navigate("/");
    }
  }, [navigate, userState]);

  return (
    <div className={classes.page_wrapper}>
      {userState.isLoading && <PageLoading />}
      {userState.isAuthenticated && (
        <div className={classes.page_inner}>
          <h2>Password Changed</h2>
          <div className={classes.welcome}>
            Welcome, {userState.userData.username.split(" ")[0]}
            <span onClick={logoutHandler}>Log out</span>
          </div>
          <p>You have successfully created a new password for your Account.</p>
          <Link to="/">Go to homepage</Link>
        </div>
      )}
    </div>
  );
};

export default PasswordChanged;
