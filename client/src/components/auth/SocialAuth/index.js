import React from "react";

import GoogleIcon from "../../../images/google_icon.png";
import TwitterIcon from "../../../images/twitter_icon.png";
import GithubIcon from "../../../images/github_icon.png";

import classes from "./SocialAuth.module.css";

const SocialAuth = () => {
  const googleLogin = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };

  const githubLogin = () => {
    window.open("http://localhost:8000/auth/github", "_self");
  };

  const twitterLogin = () => {
    window.location.href = "http://localhost:8000/auth/twitter";
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
