import React, { useState } from "react";
import { Link } from "react-router-dom";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import classes from "./UtilityNavigation.module.css";

import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../../redux/userSlice";

import ClipLoader from "react-spinners/ClipLoader";

const UtilityNavigation = () => {
  const userState = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    if (logoutLoading) {
      return;
    }
    setLogoutLoading(true);
    try {
      await dispatch(userLogout()).unwrap();
      setLogoutLoading(false);
    } catch (error) {
      console.log(error);
      setLogoutLoading(false);
    }
  };

  const cartItemsQuantity = cart.items.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  const cartHasItems = cartItemsQuantity >= 1;

  return (
    <div className={classes.utility_navigation}>
      <ul>
        <li className={classes.account_link}>
          <Link
            to={`${
              userState.isAuthenticated ? "/auth/account" : "/auth/login"
            }`}
            aria-label="Profile page"
          >
            <PersonOutlineOutlinedIcon style={{ fontSize: 22 }} />
            {userState.isAuthenticated && (
              <span>{userState.userData.username.split(" ")[0]}</span>
            )}
          </Link>
        </li>
        {userState.isAuthenticated && (
          <li className={classes.logout} onClick={logoutHandler}>
            {logoutLoading ? (
              <ClipLoader color="#000" size={22} />
            ) : (
              <LogoutOutlinedIcon style={{ fontSize: 22 }} />
            )}
            <span>Logout</span>
          </li>
        )}
        <li className={classes.cart_icon}>
          <Link to="/cart" aria-label="Cart page">
            <ShoppingBagOutlinedIcon fontSize="small" />
            {cartHasItems && !cart.loading && <span>{cartItemsQuantity}</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UtilityNavigation;
