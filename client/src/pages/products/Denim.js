import React from "react";
import PageHeader from "../../components/UI/PageHeader";
import ProductsView from "../../components/products/ProductsView";

const Denim = () => {
  return (
    <>
      <PageHeader
        title="MEN'S DENIM"
        text="Explore Our selection of men's denim. Find casual or refined staple jeans"
      />
      <ProductsView category="denim" />
    </>
  );
};

export default Denim;
