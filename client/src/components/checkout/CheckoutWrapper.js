import React, { useEffect } from "react";

import "react-phone-number-input/style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

import classes from "./CheckoutWrapper.module.css";

const CheckoutWrapper = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.isLoading && !userState.isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [userState, navigate]);

  return (
    <div className={classes.checkout_wrapper}>
      <div className={classes.form_wrapper}>
        <h2>Shipping Information</h2>
        <CheckoutForm />
      </div>
      <div className={classes.order_summary}>
        <h2>Order Details</h2>
      </div>
    </div>
  );
};

export default CheckoutWrapper;
