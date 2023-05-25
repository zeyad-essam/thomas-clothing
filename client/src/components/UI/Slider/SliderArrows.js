import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

import classes from "./SliderArrows.module.css";

export const SliderArrowNext = ({ onClick }) => {
  return (
    <button
      className={`${classes.slider_arrow} ${classes.next_arrow}`}
      aria-label="Navigate to next slide"
      onClick={onClick}
    >
      <EastIcon style={{ fontSize: 18 }} />
    </button>
  );
};

export const SliderArrowPrev = ({ onClick }) => {
  return (
    <button
      className={classes.slider_arrow}
      aria-label="Navigate to previous slide"
      onClick={onClick}
    >
      <WestIcon style={{ fontSize: 18 }} />
    </button>
  );
};
