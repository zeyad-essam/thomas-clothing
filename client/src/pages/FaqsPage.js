import React from "react";

import { Helmet } from "react-helmet";

import PageHeader from "../components/UI/PageHeader";
import FaqsView from "../components/faqs/FaqsView";

const FaqsPage = () => {
  return (
    <>
      <Helmet>
        <title>Thomas | FAQS</title>
      </Helmet>
      <PageHeader title="Faqs" />
      <FaqsView />
    </>
  );
};

export default FaqsPage;
