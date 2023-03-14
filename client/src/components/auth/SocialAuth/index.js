import React from "react";

import GoogleIcon from "../../../images/google_icon.png";
import TwitterIcon from "../../../images/twitter_icon.png";
import GithubIcon from "../../../images/github_icon.png";

import classes from "./SocialAuth.module.css";

const SocialAuth = ({ isCheckingOut }) => {
  const googleLogin = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google${
        isCheckingOut ? "?checkout=true" : ""
      }`,
      "_self"
    );
  };

  const githubLogin = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/github${
        isCheckingOut ? "?checkout=true" : ""
      }`,
      "_self"
    );
  };

  const twitterLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/twitter${
      isCheckingOut ? "?checkout=true" : ""
    }`;
  };

  return (
    <div className={classes.social_auth}>
      <div onClick={googleLogin}>
        <img src={GoogleIcon} alt="google icon" />
      </div>
      <div onClick={twitterLogin}>
        <img src={TwitterIcon} alt="twitter icon" />
      </div>
      <div onClick={githubLogin}>
        <img src={GithubIcon} alt="github icon" />
      </div>
    </div>
  );
};

export default SocialAuth;
