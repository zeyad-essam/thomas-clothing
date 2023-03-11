import React from "react";

import { motion, AnimatePresence } from "framer-motion";
import Backdrop from "../Backdrop";

import { createPortal } from "react-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import classes from "./SideModal.module.css";

const SideModalVarians = {
  show: {
    x: 0,
  },
  hidden: {
    x: "-100%",
  },
};

const portalElement = document.getElementById("overlays");

const SideModal = ({ children, isOpened, onClose, onlyMobile }) => {
  return (
    <>
      {createPortal(
        <motion.div
          className={`${classes.side_modal} ${
            onlyMobile ? classes.onlyMobile : ""
          }`}
          variants={SideModalVarians}
          initial="hidden"
          animate={isOpened ? "show" : "hidden"}
          transition={{
            delay: 0.2,
            duration: 0.5,
            type: "tween",
            ease: "easeInOut",
          }}
        >
          <div className={classes.close_navigation} onClick={onClose}>
            <button>
              <CloseRoundedIcon style={{ fontSize: 34 }} />
            </button>
          </div>
          <div className={classes.children_wrapper}>{children}</div>
        </motion.div>,
        portalElement
      )}
      <AnimatePresence>
        {isOpened && <Backdrop onClose={onClose} />}
      </AnimatePresence>
    </>
  );
};

export default SideModal;
