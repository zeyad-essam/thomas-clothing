import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import { useSelector } from "react-redux";

import classes from "./TopSlider.module.css";

import { Link } from "react-router-dom";

const TopSlider = () => {
  const [swiper, setSwiper] = useState();
  const userState = useSelector((state) => state.user);

  const swiperSettings = {
    modules: [Autoplay],
    loop: true,
    grabCursor: false,
    allowTouchMove: true,
    speed: 1500,
    autoplay: {
      delay: 7000,
    },
    onSwiper: (swiper) => {
      setSwiper(swiper);
    },
  };

  const mouseEnterHandler = () => {
    swiper.autoplay.pause();
  };

  const mouseLeaveHandler = () => {
    swiper.autoplay.resume();
  };

  return (
    <div
      className={classes.slider_wrapper}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <Swiper {...swiperSettings}>
        <SwiperSlide>
          <div className={classes.link_wrapper}>
            {userState.isAuthenticated ? (
              <Link to="/products/shirts">
                Check out the FW 23 shirts collection
              </Link>
            ) : (
              <Link to="/auth/login">Log in to get free standard shipping</Link>
            )}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classes.link_wrapper}>
            <Link to="/products/denim">
              FW 23 denim collection is out - shop now
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default TopSlider;
