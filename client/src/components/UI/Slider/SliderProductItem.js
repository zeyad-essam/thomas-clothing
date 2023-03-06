import React from "react";

import { Link } from "react-router-dom";

import classes from "./SliderProductItem.module.css";

const SliderProductItem = ({ product }) => {
  const { title, slug, price, images } = product;
  return (
    <div className={classes.slider_product_item}>
      <div className={classes.image_wrapper}>
        <Link to={`/products/product-details/${slug}`}>
          <img src={images[0]} alt="product" />
          <div className={classes.hover_image}>
            <img src={images[1]} alt="product" />
          </div>
        </Link>
      </div>
      <div className={classes.product_title}>
        <Link to={`/products/product-details/${slug}`}>{title}</Link>
      </div>
      <span>${price}</span>
    </div>
  );
};

export default SliderProductItem;
