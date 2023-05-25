import React, { useState } from "react";

import useInput from "../../../utils/hooks/useInput";
import { validateEmail } from "../../../utils/auth";
import axios from "axios";

import ClipLoader from "react-spinners/ClipLoader";
import EastIcon from "@mui/icons-material/East";

import classes from "./Newsletter.module.css";

const Newsletter = () => {
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
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
      emailReset();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response.data.message || "something went wrong",
      });
    }
    setIsLoading(false);
  };

  return (
    <section className={classes.newsletter}>
      <h3>Enter The World Of Thomas</h3>
      <p>Hear about exclusive events, collections and news.</p>
      <form onSubmit={newsSubscribeHandler}>
        <div className={classes.form_control}>
          <label htmlFor="news-letter-email">Email address*</label>
          <div
            className={`${classes.input_wrapper} ${
              emailHasError && classes.error
            }`}
          >
            <input
              className={emailHasError ? classes.has_error : ""}
              type="email"
              id="news-letter-email"
              name="email"
              placeholder="Enter your email."
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            <button type="submit" aria-label="Subscribe to newsletter">
              {isLoading ? (
                <ClipLoader color="#212121" size={17} />
              ) : (
                <EastIcon style={{ fontSize: 17, color: "#212121" }} />
              )}
            </button>
          </div>
          <div className={classes.notification_wrapper}>
            {status && (
              <span
                className={`${status.type === "error" && "error"} ${
                  status.type === "success" && "success"
                }`}
              >
                {status.message}
              </span>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default Newsletter;
