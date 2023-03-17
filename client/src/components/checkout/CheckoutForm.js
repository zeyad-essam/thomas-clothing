import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import axios from "axios";

import classes from "./CheckoutForm.module.css";

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [cardIsValid, setCardIsValid] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

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
    console.log(event);
    setCardIsValid(event.complete);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!cardIsValid) {
      return;
    }

    setProcessing(true);

    try {
      const response = await axios.get(
        "http://localhost:8000/stripe/create-payment-intent",
        { withCredentials: true }
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
        setError(`Payment failed ${payload.error.message}`);
      }
      if (payload.paymentIntent.status === "succeeded") {
        window.location.href = "/";
        cardElement.clear();
        setSucceeded(true);
      }
    } catch (err) {
      const error = err.response
        ? err.response.data.message
        : "something went wrong";
      setError(error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form
      id="payment-form"
      className={classes.payment_form}
      onSubmit={handleSubmit}
    >
      <CardElement
        id="card-element"
        className={classes.card_element}
        options={cardStyle}
        onChange={handleChange}
      />
      <button disabled={!cardIsValid || processing}>
        {processing ? "loading" : "Pay Now"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
