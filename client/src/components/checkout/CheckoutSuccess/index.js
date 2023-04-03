import React from "react";
import { Link } from "react-router-dom";

import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

import classes from "./CheckoutSuccess.module.css";

const CheckoutSuccess = ({ paymentType }) => {
  console.log(paymentType);
  return (
    <div className={classes.checkout_success_wrapper}>
      <div className={classes.checkout_success_inner}>
        <i>
          <DoneOutlinedIcon style={{ color: "#5cb85c", fontSize: 55 }} />
        </i>
        <h3>
          {paymentType === "card"
            ? "Payment Successfull"
            : "Order Created Successfully"}
        </h3>
        <p>We'll send an email confermation with details and tracking info</p>
        <Link to="/">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
