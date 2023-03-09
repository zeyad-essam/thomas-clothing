import React, { useEffect, useState } from "react";
import PageLoading from "../../UI/PageLoading";

import axios from "axios";

import classes from "./ProductDetails.module.css";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";

const ProductDetails = ({ slug }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/product-details`,
          {
            params: {
              slug,
            },
          }
        );
        setProduct(response.data.product);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [slug]);

  return (
    <div className={classes.product_details_wrapper}>
      {loading && (
        <div className={classes.loading_wrapper}>
          <PageLoading />
        </div>
      )}
      {!loading && error && (
        <div className={classes.error}>Something went wrong!</div>
      )}
      {!loading && !error && (
        <div className={classes.product_details}>
          <ImageGallery images={product.images} />
          <ProductInfo product={product} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
