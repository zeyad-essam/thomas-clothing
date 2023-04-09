import React from "react";
import { Link } from "react-router-dom";

import classes from "./Assistance.module.css";

const Assistance = ({ center }) => {
  return (
    <div className={`${classes.assistance} ${center ? classes.center : ""}`}>
      <h4>Need Assistance?</h4>
      <p>Please contact our Customer Care team either</p>
      <p>
        By telephone: <Link to="#">+1-234-567-8910</Link> Or via our{" "}
        <Link to="/contact">Contact Form</Link>
      </p>
      <p>
        Our Customer Care team is available to help you from Monday to Saturday
        from 8 AM to 10 PM (ET).
      </p>
    </div>
  );
};

export default Assistance;
