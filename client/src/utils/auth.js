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
