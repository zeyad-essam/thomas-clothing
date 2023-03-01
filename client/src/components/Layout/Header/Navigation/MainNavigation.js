import React from "react";
import { Link } from "react-router-dom";

import { navLinks } from "../../../../utils/navlinks";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <nav className={classes.main_navigation}>
      <ul>
        {navLinks.map((link) => (
          <li key={link.text}>
            <Link to={link.path}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNavigation;
