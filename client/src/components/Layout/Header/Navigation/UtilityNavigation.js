import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import classes from "./UtilityNavigation.module.css";

import { useDispatch } from "react-redux";
import { userLogout } from "../../../../redux/userSlice";

import ClipLoader from "react-spinners/ClipLoader";

const UtilityNavigation = () => {
  const userState = useSelector((state) => state.user);
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

  return (
    <div className={classes.utility_navigation}>
      <ul>
        <li className={classes.account_link}>
          <Link
            to={`${
              userState.isAuthenticated ? "/auth/account" : "/auth/login"
            }`}
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
        <li>
          <Link to="/cart">
            <ShoppingBagOutlinedIcon fontSize="small" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UtilityNavigation;
