import React from "react";

import { createPortal } from "react-dom";

import { motion } from "framer-motion";

import classes from "./Backdrop.module.css";

const portalElement = document.getElementById("overlays");

const Backdrop = ({ onClose }) => {
  return createPortal(
    <motion.div
      initial={{ x: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={classes.backdrop}
      onClick={onClose}
    />,
    portalElement
  );
};

export default Backdrop;
