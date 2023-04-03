import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../../../redux/cartSlice";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ClipLoader from "react-spinners/ClipLoader";

import classes from "./CartItem.module.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [isRemovig, setIsRemoving] = useState(false);

  const removeItemHandler = async () => {
    setIsRemoving(true);
    try {
      await dispatch(
        removeFromCart({ product: item.product, size: item.size })
      ).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsRemoving(false);
    }
  };
  return (
    <li className={classes.cart_item}>
      <div className={classes.image_wrapper}>
        <Link to={`/products/product-details/${item.product.slug}`}>
          <img src={item.product.images[0]} alt="product" />
        </Link>
      </div>
      <div className={classes.product_info}>
        <h3>
          <Link to={`/products/product-details/${item.product.slug}`}>
            {item.product.title}
          </Link>
        </h3>
        <div className={classes.product_details}>
          <ul>
            <li>Color: {item.product.color.text}</li>
            <li>Size IT: {item.size}</li>
            <li>Quantity: {item.quantity}</li>
          </ul>
        </div>
        <button className={classes.remove_item} onClick={removeItemHandler}>
          <span>Remove</span>
          <i>
            {isRemovig ? (
              <ClipLoader size={14} />
            ) : (
              <CloseRoundedIcon style={{ fontSize: 16 }} />
            )}
          </i>
        </button>
      </div>
      <div className={classes.product_price}>
        ${(parseInt(item.product.price) * parseInt(item.quantity)).toFixed(2)}
      </div>
    </li>
  );
};

export default CartItem;
