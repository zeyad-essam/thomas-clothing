import React from "react";
import PageHeader from "../../components/UI/PageHeader";
import ProductsView from "../../components/products/ProductsView";

import { Helmet } from "react-helmet";

const Denim = () => {
  return (
    <>
      <Helmet>
        <title>Thomas | Denim</title>
      </Helmet>
      <PageHeader
        title="MEN'S DENIM"
        text="Explore Our selection of men's denim. Find casual or refined staple jeans"
      />
      <ProductsView category="denim" />
    </>
  );
};

export default Denim;
