import React from "react";

import classes from "./OrderSummary.module.css";

const OrderSummary = ({ totalPrice, onCheckout }) => {
  return (
    <div className={classes.cart_checkout}>
      <h3>ORDER SUMMARY</h3>
      <div className={classes.order_details}>
        <div className={classes.devide}>
          <span>Subtotal: </span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className={classes.devide}>
          <span>Estimated Shipping: </span>
          <span>from $0.00</span>
        </div>
      </div>
      <div className={`${classes.order_total} ${classes.devide}`}>
        <span>Estimated Total</span>
        <span>${Number(totalPrice).toFixed(2)}</span>
      </div>
      <button className="btn-primary" onClick={onCheckout}>
        Secure Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
