import React, { useState, memo } from "react";

import useInput from "../../../utils/hooks/useInput";
import { validateEmail } from "../../../utils/auth";
import FormButton from "../../UI/FormButton";

import axios from "axios";

import classes from "./NewsForm.module.css";

const NewsForm = () => {
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    // reset: emailReset,
  } = useInput(validateEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const newsSubscribeHandler = async (e) => {
    e.preventDefault();
    if (!emailIsValid) {
      setStatus({
        type: "error",
        message: "Please enter valid email address.",
      });
      return;
    }
    setIsLoading(true);
    setStatus(null);
    try {
      const response = await axios({
        method: "post",
        url: "/api/subscribe/news-subscribe",
        data: {
          email: emailValue,
        },
      });
      setStatus({ type: "success", message: response.data.message });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response.data.message || "something went wrong",
      });
    }
    setIsLoading(false);
  };

  return (
    <form className={classes.news_form} onSubmit={newsSubscribeHandler}>
      <input
        className={emailHasError ? classes.has_error : ""}
        type="email"
        id="news-email"
        name="email"
        placeholder="Enter your email."
        value={emailValue}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
      />
      <div className={classes.notification_wrapper}>
        {status && (
          <p className={`${status.type === "success" ? "success" : "error"}`}>
            {status.message}
          </p>
        )}
      </div>
      <div className={classes.button_wrapper}>
        <FormButton isLoading={isLoading} text="Sign Up" />
      </div>
    </form>
  );
};

export default memo(NewsForm);
