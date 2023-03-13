import React from "react";
import { Link } from "react-router-dom";

import classes from "./CartCheckout.module.css";

const CartCheckout = ({ totalPrice }) => {
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
          <span>from $20.00</span>
        </div>
      </div>
      <div className={`${classes.order_total} ${classes.devide}`}>
        <span>Estimated Total</span>
        <span>${(Number(totalPrice) + 20).toFixed(2)}</span>
      </div>
      <Link className="btn-primary" to="/checkout">
        Secure Checkout
      </Link>
    </div>
  );
};

export default CartCheckout;
