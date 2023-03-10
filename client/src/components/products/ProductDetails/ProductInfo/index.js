import React, { useState } from "react";
import Tab from "../../../UI/Tab";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/cartSlice";

import ClipLoader from "react-spinners/ClipLoader";

import classes from "./ProductInfo.module.css";

const ProductInfo = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const selectSizeHandler = (size) => {
    setSelectedSize(size);
  };

  const addToCartHandler = async () => {
    if (!selectedSize) {
      return;
    } else {
      try {
        await dispatch(addToCart({ product, size: selectedSize })).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={classes.product_info_wrapper}>
      <div className={classes.product_info_inner}>
        <h2>{product.title}</h2>
        <span>${product.price}</span>
        <div className={classes.product_sizes}>
          <h4>
            Size: <span>IT</span>
          </h4>
          <ul>
            {product.availableSizes.map((size) => (
              <li
                key={size}
                className={size === selectedSize ? classes.selected : ""}
                onClick={selectSizeHandler.bind(null, size)}
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
        <button onClick={addToCartHandler} disabled={cart.loading}>
          {cart.loading ? <ClipLoader color="#fff" size={24} /> : "Add to bag"}
        </button>
        <div className={classes.product_tabs}>
          <Tab title="Details">
            <p>{product.details}</p>
          </Tab>
          <Tab title="Sizes & fit">
            <ul>
              <li>All sizes fit Italian standards</li>
              <li>designed for a regular silhouette</li>
            </ul>
          </Tab>
          <Tab title="Shipping & returns">
            <p>
              We strive to provide a seamless shopping experience, and we have a
              clear shipping and return policy to ensure your satisfaction. We
              offer reliable shipping with tracking and free returns within 14
              days of delivery for all orders within Egypt.
            </p>
          </Tab>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
