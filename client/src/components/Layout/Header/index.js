import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import MainNavigation from "./Navigation/MainNavigation";
import MobileNavigation from "./Navigation/MobileNavigation";
import UtilityNavigation from "./Navigation/UtilityNavigation";

import MenuSharpIcon from "@mui/icons-material/MenuSharp";

import { ReactComponent as BlackLogo } from "../../../images/logo-black.svg";

import classes from "./Header.module.css";
import TopSlider from "./TopSlider";

const Header = () => {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const location = useLocation();

  const toggleMobileNav = () => {
    setOpenMobileNav(!openMobileNav);
  };

  const closeMobileNav = () => {
    setOpenMobileNav(false);
  };

  // close mobile navigation on screens bigger than 991.8 pixels
  const handleResize = () => {
    if (window.innerWidth >= 992) {
      setOpenMobileNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // disable scroll when mobile nav is opened
  useEffect(() => {
    if (openMobileNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [openMobileNav]);

  // close mobile navigation on route change
  useEffect(() => {
    setOpenMobileNav(false);
  }, [location]);

  return (
    <div
      className={`${classes.header_wrapper} ${
        openMobileNav ? classes.nav_open : ""
      }`}
    >
      <TopSlider />
      <header className={classes.header}>
        <div className={classes.header_left}>
          <button onClick={toggleMobileNav}>
            <MenuSharpIcon style={{ fontSize: 30 }} />
          </button>
          <div className={classes.logo}>
            <Link to="/" aria-label="Home page">
              <BlackLogo />
            </Link>
          </div>
        </div>
        <MainNavigation />
        <MobileNavigation isOpened={openMobileNav} onClose={closeMobileNav} />
        <UtilityNavigation />
      </header>
    </div>
  );
};

export default Header;
