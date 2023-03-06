import React, { useCallback, useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import useMediaQuery from "@mui/material/useMediaQuery";

import "swiper/css";
import "swiper/css/pagination";
import "./slider.css";

import classes from "./ProductItem.module.css";

const ProductItem = ({ product }) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const isPc = useMediaQuery("(min-width:991.8px)");

  const swiperSettings = {
    modules: [Pagination],
    pagination: { clickable: true },
    loop: true,
    grabCursor: false,
    allowTouchMove: true,
    speed: 500,
    onSwiper: (swiperRef) => setSwiperRef(swiperRef),
    breakpoints: {
      992: {
        speed: 1500,
        allowTouchMove: false,
      },
    },
  };

  const handleMouseEnter = () => {
    if (!isPc) {
      return;
    }
    const sliderPlayTimeout = setTimeout(() => {
      swiperRef.slideNext();
      const sliderPlayInterval = setInterval(() => {
        swiperRef.slideNext();
      }, 2500);
      setIntervalId(sliderPlayInterval);
    }, 1000);
    setTimerId(sliderPlayTimeout);
  };

  const handleMouseLeave = () => {
    if (!isPc) {
      return;
    }
    if (timerId) {
      clearTimeout(timerId);
    }
    if (intervalId) {
      clearInterval(intervalId);
    }
    swiperRef.slideToLoop(0);
  };

  const handleClick = () => {
    if (!isPc) {
      return;
    }
    if (timerId) {
      clearTimeout(timerId);
    }
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const handleResize = useCallback(() => {
    if (isPc) {
      return;
    }
    if (timerId) {
      clearTimeout(timerId);
    }
    if (intervalId) {
      clearInterval(intervalId);
    }
  }, [intervalId, timerId, isPc]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

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
          <Link to={`/products/product-details/${product.slug}`}>
            <Swiper
              className="mySwiper"
              {...swiperSettings}
              style={{ "--swiper-transition-timing-function": "ease-in-out" }}
            >
              {product.images.map((image) => (
                <SwiperSlide key={image}>
                  <img src={image} alt="product" />
                </SwiperSlide>
              ))}
            </Swiper>
          </Link>
        </div>
      </div>
      <div className={classes.product_info}>
        <h3>
          <Link to={`/products/product-details/${product.slug}`}>
            {product.title}
          </Link>
        </h3>
        <span>${product.price}</span>
      </div>
    </li>
  );
};

export default memo(ProductItem);
