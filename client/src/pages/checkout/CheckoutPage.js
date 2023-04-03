import React from "react";
import CheckoutWrapper from "../../components/checkout/CheckoutWrapper";
import PageHeader from "../../components/UI/PageHeader";

import { Helmet } from "react-helmet";

const CheckoutPage = () => {
  return (
    <>
      <Helmet>
        <title>Thomas | Checkout</title>
      </Helmet>
      <PageHeader title="checkout" />
      <CheckoutWrapper />
    </>
  );
};

export default CheckoutPage;
