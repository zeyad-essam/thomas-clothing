import React, { useEffect, useState } from "react";

import axios from "axios";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import GridLoader from "react-spinners/GridLoader";

import classes from "./ProductDetails.module.css";

const ProductDetails = ({ slug }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get("/api/products/product-details", {
          params: {
            slug,
          },
        });
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
          <div className={classes.loading_spinner}>
            <GridLoader size={11} color="#212121" />
          </div>
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
