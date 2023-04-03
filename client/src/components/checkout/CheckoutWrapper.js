import React, { useEffect, useState } from "react";

import "react-phone-number-input/style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageLoading from "../UI/PageLoading";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";

import classes from "./CheckoutWrapper.module.css";

const CheckoutWrapper = () => {
  const { user: userState, cart: cartState } = useSelector((state) => state);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userState.isLoading && !userState.isAuthenticated) {
      navigate("/", { replace: true });
    }
    if (
      !userState.isLoading &&
      !cartState.loading &&
      cartState.items.length <= 0
    ) {
      navigate("/cart", { replace: true });
    }
    if (
      !userState.isLoading &&
      !cartState.loading &&
      cartState.items.length > 0
    ) {
      setIsLoading(false);
    }
  }, [userState, cartState, navigate]);

  if (isLoading) {
    return (
      <div className={classes.height_holder}>
        <PageLoading />
      </div>
    );
  }

  return (
    <div className={classes.checkout_wrapper}>
      <div className={classes.form_wrapper}>
        <h2>Shipping Information</h2>
        <CheckoutForm cartState={cartState} />
      </div>
      <div className={classes.order_summary}>
        <h2>Order Details</h2>
        <OrderSummary cartState={cartState} />
      </div>
    </div>
  );
};

export default CheckoutWrapper;
