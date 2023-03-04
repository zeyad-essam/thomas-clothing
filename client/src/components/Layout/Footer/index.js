import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./Footer.module.css";

import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";

import { navLinks } from "../../../utils/navlinks";

import NewsForm from "./NewsForm";

const Footer = () => {
  const [expanded, setExpanded] = useState(null);

  const handleExpandedTap = useCallback((value) => {
    setExpanded((prevExpanded) => {
      if (prevExpanded === value) {
        return null;
      } else {
        return value;
      }
    });
  }, []);

  return (
    <footer className={classes.footer}>
      <div className={classes.footer_inner}>
        <div
          className={`${classes.footer_section} ${classes.mobile_tab} ${
            expanded === "sitemap" ? classes.is_expanded : ""
          }`}
        >
          <h3 onClick={handleExpandedTap.bind(null, "sitemap")}>
            <MapOutlinedIcon />
            <span>Sitemap</span>
          </h3>
          <div className={classes.section_collapse}>
            <ul>
              {navLinks.map((link) => (
                <li key={link.text}>
                  <Link to={link.path}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={`${classes.footer_section} ${classes.mobile_tab} ${
            expanded === "legal-area" ? classes.is_expanded : ""
          }`}
        >
          <h3 onClick={handleExpandedTap.bind(null, "legal-area")}>
            <InfoOutlinedIcon />
            <span>Our Company</span>
          </h3>
          <div className={classes.section_collapse}>
            <ul>
              <li>
                <Link to="/terms-and-conditions">Terms and conditions</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy policy</Link>
              </li>
              <li>
                <Link to="/about-us">About us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`${classes.footer_section} ${classes.mobile_tab} ${
            expanded === "support" ? classes.is_expanded : ""
          }`}
        >
          <h3 onClick={handleExpandedTap.bind(null, "support")}>
            <ContactSupportOutlinedIcon />
            <span>Support</span>
          </h3>
          <div className={classes.section_collapse}>
            <ul>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/faq">Faq</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.footer_section}>
          <h3>
            <NewspaperOutlinedIcon />
            <span>Be the first to know.</span>
          </h3>
          <p>Sign up to our emails to receive exclusive drops and discounts.</p>
          <NewsForm />
        </div>
      </div>
      <div className={classes.footer_copyright}>
        <p>
          {" "}
          &#169; all copyrights reserved 2022{" "}
          <a href="https://ziadessam.com/" target="_blank" rel="noreferrer">
            ziadessam.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
