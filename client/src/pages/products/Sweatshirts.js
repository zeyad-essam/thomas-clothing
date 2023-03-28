import React from "react";
import PageHeader from "../../components/UI/PageHeader";
import ProductsView from "../../components/products/ProductsView";

const Sweatshirts = () => {
  return (
    <>
      <PageHeader
        title="MEN'S SWEATSHIRTS"
        text="Our collection of luxury sweatshirts and hoodies for men featuring logo sweatshirts and signature printed hoodies."
      />
      <ProductsView category="sweatshirts" />
    </>
  );
};

export default Sweatshirts;
