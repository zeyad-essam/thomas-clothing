import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { SliderArrowNext, SliderArrowPrev } from "../../UI/Slider/SliderArrows";

import { productsHighlights } from "../../../utils/UI/productHighlights";
import SliderProductItem from "../../UI/Slider/SliderProductItem";

import classes from "./ProductHighlights.module.css";

const index = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 1500,
    slidesToShow: 6,
    draggable: false,
    pauseOnHover: true,
    waitForAnimate: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          speed: 800,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 2,
          speed: 500,
          autoplay: false,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    nextArrow: <SliderArrowNext />,
    prevArrow: <SliderArrowPrev />,
  };

  return (
    <section className={classes.products_highlights}>
      <h2>highlights</h2>
      <div className={classes.highlights_slider}>
        <Slider {...settings}>
          {productsHighlights.map((product) => (
            <SliderProductItem key={product.slug} product={product} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default index;
