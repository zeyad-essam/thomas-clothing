import React from "react";
import PageHeader from "../../components/products/PageHeader";
import ProductsView from "../../components/products/ProductsView";

const Shirts = () => {
  return (
    <>
      <PageHeader
        title="Men's Shirts"
        text="Crafted from smooth silk or cotton, Thomas shirts for men bring elegance and personality. Crisp formal button shirts complete a business formal or casual look"
      />
      <ProductsView category="shirts" />
    </>
  );
};

export default Shirts;
