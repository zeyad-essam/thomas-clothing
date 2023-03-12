import React, { useRef, useState } from "react";

import { Link } from "react-router-dom";
import LinkButton from "../../UI/LinkButton.js";

import Slider from "react-slick";
import { SliderArrowNext, SliderArrowPrev } from "../../UI/Slider/SliderArrows";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderProductItem from "../../UI/Slider/SliderProductItem.js";

import { motion, useInView } from "framer-motion";

import classes from "./CategoryView.module.css";

const CategoryView = ({ data, reverse }) => {
  const [animationIsDone, setAnimationIsDone] = useState(false);
  const animationTriggerRef = useRef();
  const triggerAnimation = useInView(animationTriggerRef, { once: true });

  const desktopTextVariants = {
    initial: { x: reverse ? "100%" : "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
  };

  const sliderWrapperVariants = {
    initial: { scale: 2.1, x: "-50%", y: "-50%" }, //scale is set to 2.21 to make it take the full width on initial load. width after animation is 47%
    animate: { scale: 1, x: "-50%", y: "-50%" },
  };

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    draggable: false,
    pauseOnHover: true,
    waitForAnimate: false,
    nextArrow: <SliderArrowNext />,
    prevArrow: <SliderArrowPrev />,
  };

  const handleSliderAnimationEnd = () => {
    setAnimationIsDone(true);
  };

  return (
    <div
      className={`${classes.category_view} ${
        reverse ? classes.is_reversed : ""
      }`}
    >
      <div className={`${classes.view_section} ${classes.image_view}`}>
        <div className={classes.aspect_ratio_holder}>
          <Link to={data.link}>
            <picture>
              {data.pictures.sm && (
                <source srcSet={data.pictures.sm} media="(max-width : 959px)" />
              )}
              {data.pictures.lg && (
                <source srcSet={data.pictures.lg} media="(min-width : 960px)" />
              )}
              <img src={data.pictures.default} alt="bg" />
            </picture>
          </Link>
          <div className={`${classes.content_wrapper} ${classes.desktop}`}>
            <motion.div
              variants={desktopTextVariants}
              initial="initial"
              animate={`${triggerAnimation ? "animate" : ""}`}
              transition={{ type: "tween", duration: 0.6, ease: "linear" }}
              className={classes.content}
            >
              <h3>{data.text}</h3>
              <LinkButton text="Shop now" href={data.link} />
            </motion.div>
            <div
              ref={animationTriggerRef}
              className={classes.animation_trigger}
            ></div>
          </div>
          <div className={`${classes.content_wrapper} ${classes.mobile}`}>
            <div className={classes.content}>
              <h3>{data.text}</h3>
              <LinkButton text="Shop now" href={data.link} />
            </div>
          </div>
        </div>
      </div>
      <div className={`${classes.view_section} ${classes.slider_view}`}>
        <div className={classes.aspect_ratio_holder}>
          <motion.div
            // onAnimationEnd={handleSliderAnimationEnd}
            onAnimationComplete={handleSliderAnimationEnd}
            variants={sliderWrapperVariants}
            initial="initial"
            animate={`${triggerAnimation ? "animate" : ""}`}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`${classes.slider_wrapper} ${
              animationIsDone ? classes.is_animated : ""
            }`}
          >
            <Slider {...settings}>
              {data.products.map((product) => (
                <SliderProductItem key={product.slug} product={product} />
              ))}
            </Slider>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
