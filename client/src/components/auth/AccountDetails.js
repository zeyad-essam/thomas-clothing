import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from "./AccountDetails.module.css";
import { Link } from "react-router-dom";
import PageLoading from "../UI/PageLoading";
import Assistance from "../UI/Assistance";

const AccountDetails = () => {
  const { user: userState, cart: cartState } = useSelector((state) => state);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const ordersCount = userState.userData?.orders.length;

  const hasOrders = ordersCount >= 0;

  const cartItemsQuantity = cartState.items.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  const cartIsEmpty = cartItemsQuantity <= 0;

  useEffect(() => {
    if (!userState.isLoading && !userState.isAuthenticated) {
      navigate("/", { replace: true });
    }
    if (!userState.isLoading && !cartState.loading) {
      setIsLoading(false);
    }
  }, [userState, cartState, navigate, setIsLoading]);

  if (isLoading) {
    return (
      <div className={classes.height_holder}>
        <PageLoading />
      </div>
    );
  }

  return (
    <div className={classes.account_details_wrapper}>
      <div className={classes.cart_and_orders}>
        <div>
          <p>You have ({cartItemsQuantity}) Items in your cart</p>
          <div className={classes.link_wrapper}>
            {cartIsEmpty ? (
              <Link className="btn-primary" to="/">
                Go Shopping
              </Link>
            ) : (
              <Link className="btn-primary" to="/cart">
                View Cart
              </Link>
            )}
          </div>
        </div>
        <div>
          <p>You have ({ordersCount}) orders in total</p>
          <div className={classes.link_wrapper}>
            {hasOrders ? (
              <Link className="btn-primary" to="/auth/account/orders">
                View Orders
              </Link>
            ) : (
              <Link className="btn-primary" to="/">
                Go Shopping
              </Link>
            )}
          </div>
        </div>
      </div>
      <Assistance center />
    </div>
  );
};

export default AccountDetails;
