import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../../UI/LinkButton.js/index.js";

import classes from "./ProductsPoster.module.css";

const ProductsPoster = ({ data }) => {
  return (
    <div className={classes.ProductsPoster}>
      <div className={classes.image_wrapper}>
        <Link to="/">
          <picture>
            {data.pictures.sm && (
              <source srcSet={data.pictures.sm} media="(max-width : 767px)" />
            )}
            {data.pictures.lg && (
              <source srcSet={data.pictures.lg} media="(min-width : 768px)" />
            )}
            <img
              loading="lazy"
              src={data.pictures.lg}
              alt={data.pictures.alt}
            />
          </picture>
        </Link>
      </div>
      <div className={classes.content_wrapper}>
        <div className={classes.content}>
          <h3 className={data.darkText ? classes.dark : ""}>
            {data.text.map((text) => (
              <span key={text}>{text}</span>
            ))}
          </h3>
          <LinkButton href={data.link.href} text={data.link.text} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPoster;
