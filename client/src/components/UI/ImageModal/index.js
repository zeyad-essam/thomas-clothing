import React, { useEffect, useRef } from "react";

import { createPortal } from "react-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import classes from "./ImageModal.module.css";

const portalElement = document.getElementById("overlays");

const ImageModal = ({ images, start, onClose }) => {
  const imagesWrapperRef = useRef();
  const startImageRef = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (startImageRef) {
      const startImageBounding = startImageRef.current.getBoundingClientRect();
      const imagesWrapperBounding =
        imagesWrapperRef.current.getBoundingClientRect();

      // this equation will make the image exactly in the middle of the images wrapper container
      // the reason I used this method instead of scrollintoview is because scrollintoview doesnt work if you clicked
      // on the image quickly after you were scrolling
      const scrollValue =
        startImageBounding.top -
        imagesWrapperBounding.top -
        (window.screen.availHeight - startImageBounding.height) / 2 +
        imagesWrapperBounding.top;

      imagesWrapperRef.current.scrollTo({
        top: scrollValue,
        behavior: "smooth",
      });
    }
    return () => {
      document.body.style.overflow = "visible";
      startImageRef.current = null;
    };
  }, [startImageRef]);

  return createPortal(
    <div className={classes.image_modal}>
      <header>
        <h2>Images</h2>
        <span onClick={onClose}>
          <CloseRoundedIcon style={{ fontSize: 28 }} />
        </span>
      </header>
      <div ref={imagesWrapperRef} className={classes.images_wrapper}>
        {images.map((image, index) => (
          <div
            key={Math.random()}
            className={classes.image_wrapper}
            ref={index === start ? startImageRef : null}
          >
            <img src={image} alt="product" />
          </div>
        ))}
      </div>
    </div>,
    portalElement
  );
};

export default ImageModal;
