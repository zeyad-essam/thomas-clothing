import React, { useState } from "react";
import classes from "./ContactForm.module.css";
import FormButton from "../../UI/FormButton";
import useInput from "../../../utils/hooks/useInput";
import { validateEmail, validateUserName } from "../../../utils/auth";
import Assistance from "../../UI/Assistance";

import axios from "axios";

const ContactForm = () => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(validateUserName);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(validateEmail);

  const {
    value: objectValue,
    isValid: objectIsValid,
    hasError: objectHasError,
    valueChangeHandler: objectChangeHandler,
    inputBlurHandler: objectBlurHandler,
    reset: objectReset,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: messageValue,
    isValid: messageIsValid,
    hasError: messageHasError,
    valueChangeHandler: messageChangeHandler,
    inputBlurHandler: messageBlurHandler,
    reset: messageReset,
  } = useInput(
    (value) => value.trim().length >= 15 && value.trim().length <= 1500
  );

  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!nameIsValid || !emailIsValid || !objectIsValid || !messageIsValid) {
      setFormStatus({
        type: "error",
        message: "Please enter valid information.",
      });
      return;
    }
    setFormStatus(null);
    setIsLoading(true);
    try {
      const result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL}/api/message/post-contact-message`,
        data: {
          email: emailValue,
          userName: nameValue,
          object: objectValue,
          message: messageValue,
        },
      });

      if (result.data.success) {
        emailReset();
        nameReset();
        objectReset();
        messageReset();
        setFormStatus({
          type: "success",
          message:
            "Thank you for contacting us! We have received your message and will get back to you soon.",
        });
      } else {
        setFormStatus({ type: "error", message: "something went wrong" });
      }
    } catch (err) {
      const error = err.response
        ? err.response.data.message
        : "something went wrong";
      setFormStatus({ type: "error", message: error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.page_wrapper}>
      <div className={classes.form_wrapper}>
        <form onSubmit={formSubmitHandler}>
          <div className={classes.inputs_wrapper}>
            <div className="form_control">
              <label htmlFor="name">User name</label>
              <input
                type="text"
                id="name"
                name="username"
                placeholder="Enter your full name"
                min={6}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                value={nameValue}
              />
              <div className="notification_wrapper">
                {nameHasError && (
                  <p className="error">Please enter your full name.</p>
                )}
              </div>
            </div>
            <div className="form_control">
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
              <div className="notification_wrapper">
                {emailHasError && (
                  <p className="error">Please enter a valid email.</p>
                )}
              </div>
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="object">Object</label>
            <input
              type="text"
              id="object"
              name="object"
              placeholder="Enter message object"
              onChange={objectChangeHandler}
              onBlur={objectBlurHandler}
              value={objectValue}
            />
            <div className="notification_wrapper">
              {objectHasError && (
                <p className="error">Please enter message's object.</p>
              )}
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Enter your message"
              onChange={messageChangeHandler}
              onBlur={messageBlurHandler}
              value={messageValue}
              maxLength={1500}
              required
            />
            <div className="notification_wrapper">
              {messageHasError && (
                <p className="error">
                  Message must be between 15 to 1500 characters.
                </p>
              )}
            </div>
          </div>
          <div className={classes.button_wrapper}>
            <FormButton dark isLoading={isLoading} text="Send Message" />
            <div className="notification_wrapper">
              {formStatus !== null && (
                <p
                  className={formStatus.type === "error" ? "error" : "success"}
                >
                  {formStatus.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
      <Assistance center />
    </div>
  );
};

export default ContactForm;
