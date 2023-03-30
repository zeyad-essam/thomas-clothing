import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";

import ImagesModal from "../../../UI/ImageModal";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "./slider.css";

import classes from "./ImageGallery.module.css";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const isMobile = useMediaQuery("(max-width:767px)");

  const swiperSettings = {
    modules: [Pagination],
    pagination: { clickable: true },
    loop: true,
    grabCursor: false,
    allowTouchMove: true,
    speed: 500,
    onSwiper: (swiper) => {
      setSwiper(swiper);
    },
  };

  const selectImageHandler = (index) => {
    setSelectedImage(index);
  };

  const resetSelectedImage = () => {
    setSelectedImage(null);
  };
  return (
    <>
      <div className={classes.image_gallery}>
        {!isMobile && (
          <div className={classes.image_grid}>
            {images.map((image, index) => (
              <img
                key={image}
                onClick={() => selectImageHandler(index)}
                src={image}
                alt="product"
              />
            ))}
          </div>
        )}
        {isMobile && (
          <div className={classes.image_swiper_wrapper}>
            <Swiper
              onClick={() => selectImageHandler(swiper.realIndex)}
              className="image_swiper"
              {...swiperSettings}
            >
              {images.map((image, index) => (
                <SwiperSlide key={image}>
                  <div className={classes.image_wrapper}>
                    <img key={image} src={image} alt="product" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
      {selectedImage !== null && (
        <ImagesModal
          images={images}
          onClose={resetSelectedImage}
          start={selectedImage}
        />
      )}
    </>
  );
};

export default ImageGallery;
