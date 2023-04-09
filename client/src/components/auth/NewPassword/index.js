import React, { useState } from "react";
import { useParams } from "react-router-dom";

import FormButton from "../../UI/FormButton";
import useInput from "../../../utils/hooks/useInput";
import { validatePassword } from "../../../utils/auth";

import classes from "./NewPassword.module.css";
import axios from "axios";

const NewPassword = () => {
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(validatePassword);

  const {
    value: passwordConfirmValue,
    isValid: passwordConfirmIsValid,
    hasError: passwordConfirmHasError,
    valueChangeHandler: passwordConfirmChangeHandler,
    inputBlurHandler: passwordConfirmBlurHandler,
    reset: passwordConfirmReset,
  } = useInput((value) => value === passwordValue);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { userId, passwordToken } = useParams();

  console.log(userId, passwordToken);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!passwordIsValid) {
      setError("Please enter valid password");
      return;
    }
    if (!passwordConfirmIsValid) {
      setError("Passwords have to match");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await axios({
        method: "post",
        url: "/api/auth/new-password",
        data: {
          password: passwordValue,
          passwordConfirm: passwordConfirmValue,
          userId,
          passwordToken,
        },
        withCredentials: true,
      });
      passwordReset();
      passwordConfirmReset();
      window.location.href = "/auth/new-password/new-password-confirmed";
    } catch (err) {
      const error = err.response
        ? err.response.data.message
        : "something went wrong";
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={classes.page_wrapper}>
        <div className={classes.page_inner}>
          <h2>Set new password</h2>
          <form onSubmit={formSubmitHandler}>
            <div className="form_control">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your new password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={passwordValue}
              />
              <div className="notification_wrapper">
                {passwordHasError && (
                  <p className="error">Please enter a valid password.</p>
                )}
              </div>
            </div>
            <div className="form_control">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                name="password"
                id="confirm-password"
                placeholder="Confirm your new password"
                onChange={passwordConfirmChangeHandler}
                onBlur={passwordConfirmBlurHandler}
                value={passwordConfirmValue}
              />
              <div className="notification_wrapper">
                {passwordConfirmHasError && (
                  <p className="error">Passwords does not match.</p>
                )}
              </div>
            </div>
            <div className={classes.button_wrapper}>
              <FormButton isLoading={isLoading} text="Apply" dark />
            </div>
            <div className="notification_wrapper">
              {error && <p className="error">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
