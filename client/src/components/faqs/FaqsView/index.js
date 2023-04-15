import React from "react";
import { Link } from "react-router-dom";

import faqs from "../../../utils/UI/faqs";

import classes from "./FaqsView.module.css";
import Tab from "../../UI/Tab";

const FaqsView = () => {
  return (
    <div className={classes.faqs_wrapper}>
      <h1>Frequantly asked Questions?</h1>
      <p>
        Welcome to our FAQ page! We understand that you may have questions or
        concerns about our products, services, or policies. That's why we've
        compiled a list of frequently asked questions to help provide you with
        the information you need. Whether you're wondering about our shipping
        and return policies, our product selection, or anything else, we hope
        you'll find the answers you're looking for here. If you don't see your
        question answered, please don't hesitate to{" "}
        <Link to="/contact">contact us</Link> and we'll be happy to assist you.
      </p>
      <div className={classes.tabs_wrapper}>
        {faqs.map((questionObj) => (
          <Tab key={questionObj.question} title={`Q: ${questionObj.question}`}>
            <p>{questionObj.answer}</p>
          </Tab>
        ))}
      </div>
    </div>
  );
};

export default FaqsView;
