import React from "react";
import PageHeader from "../../components/UI/PageHeader";
import ProductsView from "../../components/products/ProductsView";

const Shirts = () => {
  return (
    <>
      <PageHeader
        title="Men's Shirts"
        text="Crafted from smooth silk or cotton, Thomas shirts for men bring elegance and personality"
      />
      <ProductsView category="shirts" />
    </>
  );
};

export default Shirts;
