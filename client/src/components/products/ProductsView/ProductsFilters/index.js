import React from "react";

import classes from "./ProductsFilters.module.css";

const ProductsFilters = ({ showFilters }) => {
  return (
    <div
      className={`${classes.products_filters_wrapper} ${
        showFilters ? classes.is_expanded : ""
      }`}
    >
      <div className={classes.products_filters_inner}>test</div>
    </div>
  );
};

export default ProductsFilters;
