import React, { useState } from "react";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import classes from "./Tab.module.css";

const Tab = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleTab = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className={`${classes.tab} ${expanded && classes.expanded}`}>
      <h3 onClick={toggleTab}>
        {title}
        <span>
          <KeyboardArrowDownRoundedIcon style={{ fontSize: 28 }} />
        </span>
      </h3>
      <div className={classes.content_wrapper}>
        <div className={classes.content_inner}>{children}</div>
      </div>
    </div>
  );
};

export default Tab;
