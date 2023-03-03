import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Background from "../../images/background.jpg";

import useInput from "../../utils/hooks/useInput";
import {
  validateEmail,
  validatePassword,
  validateUserName,
} from "../../utils/auth";

import axios from "axios";
import FormButton from "../UI/FormButton";
import SocialAuth from "./SocialAuth";
import ForgetPassword from "./ForgetPassword";

import classes from "./auth.module.css";

const AuthPage = ({ signup }) => {
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(validateEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(validatePassword);

  const {
    value: userNameValue,
    isValid: userNameIsValid,
    hasError: userNameHasError,
    valueChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: userNameReset,
  } = useInput(validateUserName);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (signup) {
      if (!emailIsValid || !passwordIsValid || !userNameIsValid) {
        setFormError("Please enter valid credintials.");
        return;
      }
    } else {
      if (!emailIsValid || !passwordIsValid) {
        setFormError("Please enter valid credintials.");
        return;
      }
    }
    setIsLoading(true);
    setFormError(null);
    try {
      if (signup) {
        await axios({
          method: "PUT",
          data: {
            email: emailValue,
            username: userNameValue,
            password: passwordValue,
          },
          url: `${process.env.REACT_APP_API_URL}/auth/signup`,
          withCredentials: true,
        });
      } else {
        await axios({
          method: "POST",
          data: {
            email: emailValue,
            password: passwordValue,
          },
          withCredentials: true,
          url: `${process.env.REACT_APP_API_URL}/auth/login`,
        });
      }
      window.location.href = "/";
    } catch (err) {
      const error = err.response.data.message || "something went wrong";
      setFormError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showForgetPasswordHandler = () => {
    setShowForgetPassword(true);
  };

  const cancelForgetPasswordHandler = () => {
    setShowForgetPassword(false);
  };

  useEffect(() => {
    if (showForgetPassword) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showForgetPassword]);

  useEffect(() => {
    userNameReset();
    passwordReset();
    emailReset();
    setFormError(null);
  }, [signup, userNameReset, passwordReset, emailReset]);

  return (
    <>
      <div className={classes.page_wrapper}>
        <div className={classes.form_Wrapper}>
          <div className={classes.form_inner}>
            <h2>{signup ? "Sign up" : "Login."}</h2>
            <p>
              {signup
                ? "Please enter your informations."
                : "Login with your email and password."}
            </p>
            <form onSubmit={formSubmitHandler}>
              {signup && (
                <div
                  className={`${classes.form_control} ${
                    userNameHasError ? classes.has_error : ""
                  }`}
                >
                  <label htmlFor="username">User name</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your full name"
                    min={6}
                    onChange={userNameChangeHandler}
                    onBlur={userNameBlurHandler}
                    value={userNameValue}
                  />
                  <div className={classes.notification_wrapper}>
                    {userNameHasError && (
                      <p className="error">Please enter your full name.</p>
                    )}
                  </div>
                </div>
              )}
              <div
                className={`${classes.form_control} ${
                  emailHasError ? classes.has_error : ""
                }`}
              >
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  value={emailValue}
                />
                <div className={classes.notification_wrapper}>
                  {emailHasError && (
                    <p className="error">Please enter a valid email.</p>
                  )}
                </div>
              </div>
              <div
                className={`${classes.form_control} ${
                  passwordHasError ? classes.has_error : ""
                }`}
              >
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  min={8}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                  value={passwordValue}
                />
                <div
                  className={classes.notification_wrapper}
                  style={{ marginBottom: 4 }}
                >
                  {passwordHasError && (
                    <p className="error">
                      Password must be at least 8 characters.
                    </p>
                  )}
                </div>
              </div>
              <FormButton
                isLoading={isLoading}
                text={signup ? "Sign Up" : "Log in"}
                dark
              />
              <div className={classes.notification_wrapper}>
                {formError && <p className="error">{formError}</p>}
              </div>
              {!signup && (
                <span
                  className={classes.forget_password}
                  onClick={showForgetPasswordHandler}
                >
                  Forget password?
                </span>
              )}
            </form>
            <div className={classes.seperate}>
              <span>or log in with</span>
            </div>
            <SocialAuth />
            <div className={classes.swith_link}>
              {signup ? (
                <p>
                  Already have an account? <Link to="/auth/login">Login</Link>
                </p>
              ) : (
                <p>
                  Don't have an account yet?{" "}
                  <Link to="/auth/signup">Sign up</Link>
                </p>
              )}
            </div>
          </div>
        </div>
        <div
          className={classes.image_wrapper}
          style={{ backgroundImage: `url(${Background})` }}
        ></div>
      </div>
      {!signup && showForgetPassword && (
        <ForgetPassword onCancel={cancelForgetPasswordHandler} />
      )}
    </>
  );
};

export default AuthPage;
