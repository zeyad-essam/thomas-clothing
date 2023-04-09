import React, { useState } from "react";
import classes from "./ContactForm.module.css";
import FormButton from "../../UI/FormButton";
import useInput from "../../../utils/hooks/useInput";
import { validateEmail, validateUserName } from "../../../utils/auth";
import Assistance from "../../UI/Assistance";

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

  const [formError, setFormError] = useState(null);

  return (
    <div className={classes.page_wrapper}>
      <div className={classes.form_wrapper}>
        <form>
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
            <FormButton
              dark
              // isLoading={isLoading}
              text="Send Message"
            />
            <div className="notification_wrapper">
              {formError && <p className="error">test</p>}
            </div>
          </div>
        </form>
      </div>
      <Assistance center />
    </div>
  );
};

export default ContactForm;
