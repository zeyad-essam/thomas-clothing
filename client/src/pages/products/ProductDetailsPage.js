import React from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../../components/products/ProductDetails";

import { Helmet } from "react-helmet";

const ProductDetailsPage = () => {
  const { productSlug } = useParams();
  return (
    <>
      <Helmet>
        <title>Thomas | {productSlug}</title>
      </Helmet>
      <ProductDetails slug={productSlug} />
    </>
  );
};

export default ProductDetailsPage;
