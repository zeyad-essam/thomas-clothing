import React from "react";
import PageHeader from "../../components/UI/PageHeader";
import ProductsView from "../../components/products/ProductsView";

import { Helmet } from "react-helmet";

const Shirts = () => {
  return (
    <>
      <Helmet>
        <title>Thomas | Shirts</title>
      </Helmet>
      <PageHeader
        title="Men's Shirts"
        text="Crafted from smooth silk or cotton, Thomas shirts for men bring elegance and personality"
      />
      <ProductsView category="shirts" />
    </>
  );
};

export default Shirts;
