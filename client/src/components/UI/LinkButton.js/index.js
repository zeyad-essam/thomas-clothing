import React from "react";

import { Link } from "react-router-dom";

import classes from "./LinkButton.module.css";

const LinkButton = ({ href, text }) => {
  return (
    <Link to={href} className={classes.link}>
      {text}
    </Link>
  );
};

export default LinkButton;
