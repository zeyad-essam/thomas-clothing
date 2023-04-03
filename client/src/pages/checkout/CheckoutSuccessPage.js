import React from "react";
import CheckoutSuccess from "../../components/checkout/CheckoutSuccess";

const CheckoutSuccessPage = () => {
  const paymentType = new URLSearchParams(window.location.search).get("type");
  return <CheckoutSuccess paymentType={paymentType} />;
};

export default CheckoutSuccessPage;
