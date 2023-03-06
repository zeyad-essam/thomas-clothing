import React from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../../components/products/ProductDetails";

const ProductDetailsPage = () => {
  const { productSlug } = useParams();
  return <ProductDetails slug={productSlug} />;
};

export default ProductDetailsPage;
