import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideModal from "../../../UI/SideModal";

import { navLinks } from "../../../../utils/navlinks";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../../redux/userSlice";

import ClipLoader from "react-spinners/ClipLoader";

import { ReactComponent as BlackLogo } from "../../../../images/logo-black.svg";

import { useNavigate } from "react-router-dom";

import classes from "./MobileNavigation.module.css";

const MobileNavigation = ({ isOpened, onClose }) => {
  const userState = useSelector((state) => state.user);
  const [logoutLoading, setLogoutLoading] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    if (logoutLoading) {
      return;
    }
    setLogoutLoading(true);
    try {
      await dispatch(userLogout()).unwrap();
      setLogoutLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLogoutLoading(false);
    }
  };

  return (
    <SideModal isOpened={isOpened} onClose={onClose} onlyMobile>
      <div className={classes.navigation_menu}>
        <header>
          <Link to="/">
            <BlackLogo />
          </Link>
        </header>
        <ul className={classes.product_links}>
          {navLinks.map((link) => (
            <li className={classes.shop_link} key={link.text}>
              <Link to={link.path}>{link.text}</Link>
            </li>
          ))}
        </ul>
        <ul>
          <li>
            <Link
              to={`${
                userState.isAuthenticated ? "/auth/account" : "/auth/login"
              }`}
            >
              <i>
                <PersonOutlineOutlinedIcon />
              </i>
              <span>{userState.isAuthenticated ? "My account" : "Login"}</span>
            </Link>
          </li>
          {userState.isAuthenticated && (
            <li className={classes.logout} onClick={logoutHandler}>
              <i>
                {logoutLoading ? (
                  <ClipLoader color="#000" size={22} />
                ) : (
                  <LogoutOutlinedIcon />
                )}
              </i>
              <span>Logout</span>
            </li>
          )}
          <li>
            <Link to="/contact">
              <i>
                <ChatBubbleOutlineOutlinedIcon style={{ fontSize: 22 }} />
              </i>
              <span>Contact us</span>
            </Link>
          </li>
        </ul>
      </div>
    </SideModal>
  );
};

export default MobileNavigation;
