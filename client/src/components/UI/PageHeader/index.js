import React from "react";

import classes from "./PageHeader.module.css";

const PageHeader = ({ title, text }) => {
  return (
    <section className={classes.page_header}>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </section>
  );
};

export default PageHeader;
