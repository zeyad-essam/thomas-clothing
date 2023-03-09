import React, { useEffect, useRef } from "react";

import { createPortal } from "react-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import classes from "./ImageModal.module.css";

const portalElement = document.getElementById("overlays");

const ImageModal = ({ images, start, onClose }) => {
  const startImageRef = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (startImageRef) {
      startImageRef.current.scrollIntoView({
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
      <div className={classes.images_wrapper}>
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
