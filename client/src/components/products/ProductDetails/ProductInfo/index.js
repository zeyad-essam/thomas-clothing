import React, { useState } from "react";
import Tab from "../../../UI/Tab";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/cartSlice";

import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import ProductAddedToast from "./ProductAddedToast";

import classes from "./ProductInfo.module.css";

const ProductInfo = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState(null);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const selectSizeHandler = (size) => {
    setError(null);
    setSelectedSize(size);
  };

  const addToCartHandler = async () => {
    if (!selectedSize) {
      setError("Please Select a size.");
      return;
    } else {
      try {
        toast.dismiss();
        await dispatch(addToCart({ product, size: selectedSize })).unwrap();
        toast(<ProductAddedToast product={product} size={selectedSize} />, {
          pauseOnHover: true,
        });
      } catch (error) {
        setError(error);
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
        <div className={classes.button_wrapper}>
          <button onClick={addToCartHandler} disabled={cart.loading}>
            {cart.loading ? (
              <ClipLoader color="#fff" size={24} />
            ) : (
              "Add to bag"
            )}
          </button>
          {error && <p className={classes.error}>{error}</p>}
        </div>
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
