import React from "react";
import { Link } from "react-router-dom";

import classes from "./ProductAddedToast.module.css";

const ProductAddedToast = ({ closeToast, product, size }) => {
  return (
    <div className={classes.product_added_toast}>
      <div className={classes.image_wrapper}>
        <img src={product.images[0]} alt="product" />
      </div>
      <div className={classes.text_wrapper}>
        <p>Product added</p>
        <span>Size: {size}</span>
      </div>
      <Link to="/cart" onClick={closeToast}>
        View Cart
      </Link>
    </div>
  );
};

export default ProductAddedToast;
