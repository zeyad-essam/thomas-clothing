import React from "react";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import PageLoading from "../../UI/PageLoading";

import OrderSummary from "./OrderSummary";
import CartProducts from "./CartProducts";

import classes from "./CartView.module.css";
import Assistance from "../../UI/Assistance";

const CartView = () => {
  const cart = useSelector((state) => state.cart);
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    if (userState.isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/auth/login?checkout=true");
    }
  };

  return (
    <div className={classes.cart_view_wrapper}>
      <div className={classes.cart_view}>
        {cart.loading && <PageLoading />}
        {!cart.loading && cart.items.length === 0 && (
          <div className={classes.empty_cart}>
            <div className={classes.actions}>
              <p>Your have 0 items in your cart</p>
              <div className={classes.link_wrapper}>
                <Link className="btn-primary" to="/">
                  Continue shopping
                </Link>
              </div>
            </div>
            <div className={classes.assistance_wrapper}>
              <Assistance />
            </div>
          </div>
        )}
        {!cart.loading && cart.items.length >= 1 && (
          <div className={classes.cart_details}>
            <div>
              <CartProducts items={cart.items} />
              <div className={classes.cart_actions}>
                <Link to="/">Continue Shopping</Link>
                <div className={classes.checkout}>
                  <button className="btn-primary" onClick={checkoutHandler}>
                    Secure Checkout
                  </button>
                </div>
              </div>
            </div>
            <div>
              <OrderSummary
                onCheckout={checkoutHandler}
                totalPrice={cart.totalPrice}
              />
              <Assistance />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartView;
