import React, { useState } from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";

import classes from "./ProductItem.module.css";

const ProductItem = ({ product }) => {
  const [sliderRef, setSliderRef] = useState(null);
  const [timerId, setTimerId] = useState(null);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    draggable: false,
    autoplaySpeed: 2500,
    waitForAnimate: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          speed: 700,
        },
      },
    ],
  };

  const handleMouseEnter = () => {
    const sliderPlayTimeout = setTimeout(() => {
      sliderRef.slickNext();
      sliderRef.slickPlay();
    }, 1000);
    setTimerId(sliderPlayTimeout);
  };

  const handleMouseLeave = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    sliderRef.slickPause();
    sliderRef.slickGoTo(0);
  };

  const handleClick = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    sliderRef.slickPause();
  };

  return (
    <li className={classes.product_item}>
      {/* the slider wrapper is here to hold the place for the slider while the images is still loading.
          its dimenstions are set to the same dimensions for the image and the silder inner is set to position absolute
          with the full width and height as the slider wrapper.
          this prevents images from flashing on initial load
      */}
      <div className={classes.slider_wrapper}>
        <div
          className={classes.slider_inner}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <Link to={`/product-details/${product.slug}`}>
            <Slider
              ref={(slider) => setSliderRef(slider)}
              className="product_item_slider"
              {...settings}
            >
              {product.images.map((image) => (
                <img
                  key={image}
                  src={`http://localhost:8000/images/${image}`}
                  alt="product"
                />
              ))}
            </Slider>
          </Link>
        </div>
      </div>
      <div className={classes.product_info}>
        <h3>
          <Link to={`/product-details/${product.slug}`}>{product.title}</Link>
        </h3>
        <span>${product.price}</span>
      </div>
    </li>
  );
};

export default ProductItem;
