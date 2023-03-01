import React from "react";
import PageHeader from "../../components/products/PageHeader";
import ProductsView from "../../components/products/ProductsView";

const Denim = () => {
  return (
    <>
      <PageHeader
        title="MEN'S DENIM"
        text="Explore Our selection of men's denim. Find casual or refined staple jeans, shirts and jackets embellished with seasonal prints or in classic palettes."
      />
      <ProductsView category="denim" />
    </>
  );
};

export default Denim;
