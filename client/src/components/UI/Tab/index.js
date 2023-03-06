import React, { useState } from "react";

import classes from "./Tab.module.css";

const Tab = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleTab = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className={`${classes.tab} ${expanded && classes.expanded}`}>
      <h3 onClick={toggleTab}>{title}</h3>
      <div className={classes.content_wrapper}>
        <div className={classes.content_inner}>{children}</div>
      </div>
    </div>
  );
};

export default Tab;
