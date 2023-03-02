import axios from "axios";

export const validateEmail = (value) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (value.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (value) =>
  value.trim().length >= 8 && value.trim().length <= 24;

export const validateUserName = (value) => value.trim().length >= 6;

export const logoutHandler = async () => {
  await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`, {
    withCredentials: true,
  });
  window.location.href = "/";
};
