import React from "react";

import classes from "./OrderSummary.module.css";

const OrderSummary = ({ cartState }) => {
  return (
    <div className={classes.order_summary}>
      <h4>Products</h4>
      <ul>
        {cartState.items.map((item) => (
          <li key={`${item.size}${item.product.slug}`}>
            <div className={classes.item_details}>
              <p>
                {item.quantity}X {item.product.title}
              </p>
              <span>Size: {item.size}</span>
            </div>
            <div className={classes.item_price}>
              ${parseInt(item.product.price) * parseInt(item.quantity)}
            </div>
          </li>
        ))}
      </ul>
      <div className={`${classes.order_total} ${classes.devide}`}>
        <span>Order Total</span>
        <span>${Number(cartState.totalPrice).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
