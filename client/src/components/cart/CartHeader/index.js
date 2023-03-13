import React from "react";
import { Link } from "react-router-dom";

import classes from "./CartHeader.module.css";

const CartHeader = () => {
  return (
    <div className={classes.cart_header_wrapper}>
      <div className={classes.cart_header}>
        <h2>Shopping Cart</h2>
        <div className={classes.assistance}>
          <h4>Need Assistance?</h4>
          <p>
            Please contact our Customer Care team on{" "}
            <Link to="#">+1-234-567-8910</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
