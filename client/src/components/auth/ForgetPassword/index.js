import React, { useState } from "react";

import useInput from "../../../utils/hooks/useInput";
import { validateEmail } from "../../../utils/auth";
import FormButton from "../../UI/FormButton";

import classes from "./ForgetPassword.module.css";

import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";
import { Link } from "react-router-dom";

const ForgetPassword = ({ onCancel }) => {
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(validateEmail);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!emailIsValid) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await axios({
        method: "post",
        url: "/api/auth/reset",
        data: {
          email: emailValue,
        },
      });
      // const data = result.data;
      emailReset();
      setSuccess(true);
    } catch (err) {
      const error = err.response
        ? err.response.data.message
        : "something went wrong";
      setError(error);
      console.log(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={classes.page_wrapper}>
        <header className={classes.page_header}>
          <h2>Password reset</h2>
          <button onClick={onCancel}>
            <CloseIcon />
          </button>
        </header>
        <div className={classes.page_inner}>
          {!success && (
            <>
              <p>
                Please provide your email address and we will send you a
                password reset link within the next few minutes.
              </p>
              <form onSubmit={formSubmitHandler}>
                <div
                  className={`${classes.form_control} ${
                    emailHasError ? classes.has_error : ""
                  }`}
                >
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    value={emailValue}
                  />
                  <div className={classes.notification_wrapper}>
                    {error && <p className="error">{error}</p>}
                    {!error && emailHasError && (
                      <p className="error">Please enter a valid email.</p>
                    )}
                  </div>
                </div>
                <div className={classes.buttons_wrapper}>
                  <div className={classes.cancel_button}>
                    <button type="button" onClick={onCancel}>
                      Cancel
                    </button>
                  </div>
                  <div className={classes.submit_button}>
                    <FormButton
                      isLoading={isLoading}
                      text="Reset password"
                      dark
                    />
                  </div>
                </div>
              </form>
            </>
          )}
          {success && (
            <div className={classes.success}>
              <h1>Please check your email.</h1>
              <p>
                Thanks for submitting your email address. We've sent you an
                email with the information needed to reset your password. The
                email might take a couple of minutes to reach your account.
                Please check your junk mail to ensure you receive it.
              </p>
              <Link to="/">Go To Homepage</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
