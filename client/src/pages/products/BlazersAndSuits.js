import React from "react";
import PageHeader from "../../components/UI/PageHeader";
import ProductsView from "../../components/products/ProductsView";

import { Helmet } from "react-helmet";

const BlazersAndSuits = () => {
  return (
    <>
      <Helmet>
        <title>Thomas | Blazers and Suits</title>
      </Helmet>
      <PageHeader
        title="MEN'S BLAZERS"
        text="Our blazers are a defining silhouette in classic wool to gabardine"
      />
      <ProductsView category="blazers-and-suits" />
    </>
  );
};

export default BlazersAndSuits;
