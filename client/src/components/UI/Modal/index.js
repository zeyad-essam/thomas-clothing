import React, { useEffect } from "react";

import { AnimatePresence } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.module.css";

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        <Backdrop onClose={onClose} />
      </AnimatePresence>
      <div className={classes.modal}>
        <div className={classes.content}>{children}</div>
      </div>
    </>
  );
};

export default Modal;
