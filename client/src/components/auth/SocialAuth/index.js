import React from "react";

import classes from "./SocialAuth.module.css";

const SocialAuth = ({ isCheckingOut }) => {
  const googleLogin = () => {
    window.open(
      `${process.env.REACT_APP_URL}/api/auth/google${
        isCheckingOut ? "?checkout=true" : ""
      }`,
      "_self"
    );
  };

  const githubLogin = () => {
    window.open(
      `${process.env.REACT_APP_URL}/api/auth/github${
        isCheckingOut ? "?checkout=true" : ""
      }`,
      "_self"
    );
  };

  const twitterLogin = () => {
    window.open(
      `${process.env.REACT_APP_URL}/api/auth/twitter${
        isCheckingOut ? "?checkout=true" : ""
      }`,
      "_self"
    );
  };

  return (
    <div className={classes.social_auth}>
      <div onClick={googleLogin}>
        <img
          src="https://res.cloudinary.com/drru4lsys/image/upload/v1679210303/ui%20images/google_icon.png"
          alt="google icon"
        />
      </div>
      <div onClick={twitterLogin}>
        <img
          src="https://res.cloudinary.com/drru4lsys/image/upload/v1679210303/ui%20images/twitter_icon.png"
          alt="twitter icon"
        />
      </div>
      <div onClick={githubLogin}>
        <img
          src="https://res.cloudinary.com/drru4lsys/image/upload/v1679210302/ui%20images/github_icon.png"
          alt="github icon"
        />
      </div>
    </div>
  );
};

export default SocialAuth;
