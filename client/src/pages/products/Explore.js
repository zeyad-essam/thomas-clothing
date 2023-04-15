import React from "react";
import PageHeader from "../../components/UI/PageHeader";
import ProductsView from "../../components/products/ProductsView";

import { Helmet } from "react-helmet";

const Explore = () => {
  return (
    <>
      <Helmet>
        <title>Thomas | Explore</title>
      </Helmet>
      <PageHeader
        title="Products Explore"
        text="Discover an extensive range of products across all categories on our Explore page"
      />
      <ProductsView />
    </>
  );
};

export default Explore;
