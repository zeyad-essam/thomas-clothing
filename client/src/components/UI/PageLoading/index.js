import React from "react";
import GridLoader from "react-spinners/GridLoader";

import classes from "./PageLoading.module.css";

const PageLoading = () => {
  return (
    <div className={classes.loading}>
      <GridLoader color="#212121" size={7} />
    </div>
  );
};

export default PageLoading;
