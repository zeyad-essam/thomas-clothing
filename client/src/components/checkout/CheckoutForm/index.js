import React, { useState } from "react";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import { validateEmail } from "../../../utils/auth";
import useInput from "../../../utils/hooks/useInput";
import FormButton from "../../UI/FormButton";
import { ReactComponent as CashSvg } from "../../../images/cash.svg";
import { ReactComponent as CardSvg } from "../../../images/card.svg";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import axios from "axios";
import classes from "./CheckoutForm.module.css";

const CheckoutForm = ({ cartState }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardIsValid, setCardIsValid] = useState(false);

  const [phoneValue, setPhoneValue] = useState();
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [phoneInputTouched, setPhoneInputTouched] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const {
    value: countryValue,
    isValid: countryIsValid,
    hasError: countryHasError,
    valueChangeHandler: countryChangeHandler,
    inputBlurHandler: countryBlurHandler,
  } = useInput((value) => value.trim().length >= 1);

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput((value) => value.trim().length >= 1);

  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
  } = useInput(
    (value) => value.trim().length >= 15 && value.trim().length <= 150
  );

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    setCardIsValid(event.complete);
  };

  const handlePhoneChange = (value) => {
    setPhoneValue(value);

    if (value) {
      setPhoneIsValid(isValidPhoneNumber(value));
    } else {
      setPhoneIsValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (
      !emailIsValid ||
      !countryIsValid ||
      !cityIsValid ||
      !addressIsValid ||
      !phoneIsValid
    ) {
      setFormError("Please enter valid information.");
      return;
    }
    if (selectedPaymentMethod === "card" && !cardIsValid) {
      setFormError("Your card information is not valid");
      return;
    }
    setIsLoading(true);
    const shippingInfo = {
      email: emailValue,
      phone: phoneValue,
      country: countryValue,
      city: cityValue,
      address: addressValue,
    };
    try {
      if (selectedPaymentMethod === "card") {
        const response = await axios.get(
          "/api/checkout/create-payment-intent",
          {
            withCredentials: true,
            params: {
              shippingInfo,
            },
          }
        );

        const clientSecret = response.data.clientSecret;

        const cardElement = elements.getElement(CardElement);

        const payload = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

        console.log(payload);

        if (payload.error) {
          setFormError(`Payment failed ${payload.error.message}`);
        }
        if (payload.paymentIntent.status === "succeeded") {
          cardElement.clear();
          window.location.href = "/checkout/success?type=card";
        }
      } else {
        await axios({
          method: "POST",
          url: "/api/checkout/cash-checkout",
          data: {
            shippingInfo,
          },
        });
        window.location.href = "/checkout/success?type='cash-on-delivery'";
      }
    } catch (err) {
      const error = err.response
        ? err.response.data.message
        : "something went wrong";
      setFormError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={classes.checkout_form} onSubmit={handleSubmit}>
      <div className={classes.inputs_wrapper}>
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
            required
          />
          <div className="notification_wrapper">
            {emailHasError && (
              <p className="error">Please enter a valid email.</p>
            )}
          </div>
        </div>
        <div className="form_control phone_input">
          <label htmlFor="phone">Phone</label>
          <PhoneInput
            className="phone_input_wrapper"
            placeholder="Enter phone number"
            value={phoneValue}
            onChange={handlePhoneChange}
            onBlur={() => setPhoneInputTouched(true)}
            countries={["SA", "EG", "US"]}
            defaultCountry="EG"
            international
            addInternationalOption={false}
          />
          <div className="notification_wrapper">
            {!phoneIsValid && phoneInputTouched && (
              <p className="error">Please enter a valid phone number.</p>
            )}
          </div>
        </div>
        <div className="form_control">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter your country"
            onChange={countryChangeHandler}
            onBlur={countryBlurHandler}
            value={countryValue}
            required
          />
          <div className="notification_wrapper">
            {countryHasError && (
              <p className="error">Please enter your country.</p>
            )}
          </div>
        </div>
        <div className="form_control">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter your city"
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
            value={cityValue}
            required
          />
          <div className="notification_wrapper">
            {cityHasError && <p className="error">Please enter your city.</p>}
          </div>
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          placeholder="Enter your address"
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
          value={addressValue}
          rows={4}
          required
        />
        <div className="notification_wrapper">
          {addressHasError && (
            <p className="error">
              Your address must be between 15 to 150 characters.
            </p>
          )}
        </div>
      </div>
      <h3>Select Payment Method</h3>
      <div className={classes.choose_payment}>
        <div
          className={selectedPaymentMethod === "cash" ? classes.selected : ""}
          onClick={() => setSelectedPaymentMethod("cash")}
        >
          <i>
            <CashSvg />
          </i>
          <span>Cash on delivery</span>
        </div>
        <div
          className={selectedPaymentMethod === "card" ? classes.selected : ""}
          onClick={() => setSelectedPaymentMethod("card")}
        >
          <i>
            <CardSvg />
          </i>
          <span>Pay with card</span>
        </div>
      </div>
      {selectedPaymentMethod === "card" && (
        <div className={classes.card_element}>
          <h3>Enter your card information</h3>
          <CardElement
            id="card-element"
            className={classes.card_element}
            options={cardStyle}
            onChange={handleChange}
          />
        </div>
      )}
      <FormButton
        dark
        isLoading={isLoading}
        text={
          selectedPaymentMethod === "card"
            ? `Pay $${cartState.totalPrice}`
            : "Confirm Order"
        }
      />
      <div className="notification_wrapper">
        {formError && <p className="error">{formError}</p>}
      </div>
    </form>
  );
};

export default CheckoutForm;
