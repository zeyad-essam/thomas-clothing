import React from "react";
import CartItem from "./CartItem";

import classes from "./CartProducts.module.css";

const CartProducts = ({ items }) => {
  return (
    <div className={classes.cart_products}>
      <ul>
        {items.map((item) => (
          <CartItem key={`${item.product._id}${item.size}`} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartProducts;
