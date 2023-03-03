import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import LinkButton from "../../UI/LinkButton.js";

import { heroSlides } from "../../../utils/UI/heroSlides.js";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";

import classes from "./Hero.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";

let progressBarUpdateInterval;
const sliderAutoPlaySpeed = 10000;

const Hero = () => {
  const isPc = useMediaQuery("(min-width:991.8px)");
  const [timeRemaining, setTimeRemaining] = useState(sliderAutoPlaySpeed);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [imageSliderRef, setImageSliderRef] = useState(null);
  const [navigationSliderRef, setNavigationSliderRef] = useState(null);

  const updateProgress = useCallback(() => {
    if (!isPaused) {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          setIsPaused(true);
          navigationSliderRef.slickNext();
          return sliderAutoPlaySpeed;
        }
        return prevTime - 10;
      });
    }
  }, [isPaused, navigationSliderRef]);

  useEffect(() => {
    progressBarUpdateInterval = setInterval(updateProgress, 10);
    return () => clearInterval(progressBarUpdateInterval);
  }, [updateProgress]);

  const imageSliderSettings = {
    dots: false,
    arrows: false,
    speed: 500,
    easing: "ease",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: false,
    draggable: false,
    waitForAnimate: false,
  };

  const navigationSliderSettings = {
    dots: true,
    arrows: false,
    easing: "ease",
    infinite: true,
    fade: true,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: false,
    draggable: false,
    waitForAnimate: false,
    customPaging: (i) => {
      return (
        <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {i}
        </button>
      );
    },
    beforeChange: (current, next) => {
      setActiveSlide(next);
      setTimeRemaining(sliderAutoPlaySpeed);
      setIsPaused(false);
    },
  };

  const handleMouseEnter = () => {
    if (!isPc) {
      return;
    }
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (!isPc) {
      return;
    }
    setIsPaused(false);
  };

  return (
    <div className={classes.hero_wrapper}>
      <div className={classes.image_slider_container}>
        <Slider
          asNavFor={navigationSliderRef}
          ref={(slider) => setImageSliderRef(slider)}
          {...imageSliderSettings}
        >
          {heroSlides.map((data) => (
            <div key={data.text} className={classes.slide}>
              <Link to={data.link}>
                <picture>
                  {data.pictures.sm && (
                    <source
                      srcSet={data.pictures.sm}
                      media="(max-width : 767px)"
                    />
                  )}
                  {data.pictures.md && (
                    <source
                      srcSet={data.pictures.md}
                      media="(min-width : 768px) and (max-width : 959px)"
                    />
                  )}
                  {data.pictures.lg && (
                    <source
                      srcSet={data.pictures.lg}
                      media="(min-width : 960px)"
                    />
                  )}
                  <img src={data.pictures.default} alt="bg" />
                </picture>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
      <div className={classes.navigation_slider_wrapper}>
        <div className={classes.navigation_slider_container}>
          <Slider
            className="navigation_slider"
            asNavFor={imageSliderRef}
            ref={(slider) => setNavigationSliderRef(slider)}
            {...navigationSliderSettings}
          >
            {heroSlides.map((data, index) => (
              <div
                key={`${data.text}nav`}
                className={`${classes.slide} ${
                  activeSlide === index ? classes.active : ""
                }`}
              >
                <div
                  className={classes.slide_content}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <h3>{data.text}</h3>
                  <LinkButton href={data.link} text="Shop now" />
                </div>
                <div
                  className={classes.progress_bar_wrapper}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {activeSlide === index && (
                    <div
                      className={classes.progress_bar}
                      style={{
                        width: `${
                          100 - (timeRemaining / sliderAutoPlaySpeed) * 100
                        }%`,
                      }}
                    ></div>
                  )}
                </div>
                <div
                  className={classes.slide_controls}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                ></div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Hero;
