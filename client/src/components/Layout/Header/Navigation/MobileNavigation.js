import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { navLinks } from "../../../../utils/navlinks";

import { createPortal } from "react-dom";

import Backdrop from "../../../UI/Backdrop";

import { motion, AnimatePresence } from "framer-motion";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { logoutHandler } from "../../../../utils/auth";
import ClipLoader from "react-spinners/ClipLoader";

import mobileLogo from "../../../../images/logo-mobile.png";

import classes from "./MobileNavigation.module.css";

const mobileNavVariants = {
  show: {
    x: 0,
  },
  hidden: {
    x: "-100%",
  },
};

const portalElement = document.getElementById("overlays");

const MobileNavigation = ({ isOpened, onClose }) => {
  const userState = useSelector((state) => state.user);
  const [logoutLoading, setLogoutLoading] = useState();

  const userLogout = async () => {
    if (logoutLoading) {
      return;
    }
    setLogoutLoading(true);
    try {
      await logoutHandler();
      setLogoutLoading(false);
    } catch (error) {
      console.log(error);
      setLogoutLoading(false);
    }
  };

  return (
    <>
      {createPortal(
        <motion.div
          className={classes.mobile_navigation}
          variants={mobileNavVariants}
          initial="hidden"
          animate={isOpened ? "show" : "hidden"}
          transition={{
            duration: 0.5,
            type: "tween",
            ease: "easeInOut",
          }}
        >
          <div className={classes.close_navigation} onClick={onClose}>
            <button>
              <CloseRoundedIcon style={{ fontSize: 34 }} />
            </button>
          </div>
          <div className={classes.navigation_menu}>
            <header>
              <img src={mobileLogo} alt="logo" />
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
                  <span>
                    {userState.isAuthenticated ? "My account" : "Login"}
                  </span>
                </Link>
              </li>
              {userState.isAuthenticated && (
                <li className={classes.logout} onClick={userLogout}>
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
        </motion.div>,
        portalElement
      )}
      <AnimatePresence>
        {isOpened && <Backdrop onClose={onClose} />}
      </AnimatePresence>
    </>
  );
};

export default MobileNavigation;
