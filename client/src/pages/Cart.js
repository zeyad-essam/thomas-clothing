import React from "react";
import CartHeader from "../components/cart/CartHeader";
import CartView from "../components/cart/CartView";

import { Helmet } from "react-helmet";

const Cart = () => {
  return (
    <>
      <Helmet>
        <title>Thomas | Cart</title>
      </Helmet>
      <CartHeader />
      <CartView />
    </>
  );
};

export default Cart;
