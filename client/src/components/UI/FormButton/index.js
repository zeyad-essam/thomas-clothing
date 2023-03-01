import React from "react";

import ClipLoader from "react-spinners/ClipLoader";

import classes from "./FormButton.module.css";

const FormButton = ({ isLoading, text, dark }) => {
  return (
    <button
      className={`${classes.form_button} ${dark && classes.dark}`}
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? (
        <ClipLoader color={dark ? "#fff" : "#000"} size={24} />
      ) : (
        text
      )}
    </button>
  );
};

export default FormButton;
