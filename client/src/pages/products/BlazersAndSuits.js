import React from "react";
import PageHeader from "../../components/products/PageHeader";
import ProductsView from "../../components/products/ProductsView";

const BlazersAndSuits = () => {
  return (
    <>
      <PageHeader
        title="MEN'S BLAZERS"
        text="Our blazers are a defining silhouette in classic wool to gabardine"
      />
      <ProductsView category="blazers-and-suits" />
    </>
  );
};

export default BlazersAndSuits;
