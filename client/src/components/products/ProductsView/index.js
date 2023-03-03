import React, { useEffect, useState, useCallback } from "react";

import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

import axios from "axios";

import { useQueryParams, ArrayParam } from "use-query-params";

import ProductsList from "./ProductsList";
import ProductsFilters from "./ProductsFilters";

import classes from "./ProductsView.module.css";

const ProductsView = ({ category }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);

  const [queryParams, setQueryParams] = useQueryParams(
    {
      colors: ArrayParam,
      sizes: ArrayParam,
      priceRange: ArrayParam /* [minPrice, maxPrice] */,
    },
    { arrayFormat: "repeat" }
  );

  const fetchProducts = useCallback(async () => {
    let queryObject = { ...queryParams };
    if (category) {
      queryObject.category = category;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/get-products/`,
        {
          params: queryObject,
        }
      );

      setProducts(response.data.products);
      setProductsCount(response.data.productsCount);
    } catch (error) {
      setError(true);
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }, [queryParams, category]);

  const fetchMoreProducts = useCallback(
    async (page) => {
      let queryObject = { ...queryParams, page };
      if (category) {
        queryObject.category = category;
      }
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/get-more-products/`,
          {
            params: queryObject,
          }
        );

        setProducts((prevProducts) => [
          ...prevProducts,
          ...response.data.products,
        ]);
      } catch (error) {
        setError(true);
        console.log(error.response.data.message);
      }
    },
    [queryParams, category]
  );

  useEffect(() => {
    fetchProducts();
  }, [queryParams, fetchProducts]);

  return (
    <div className="container">
      <div className={classes.products_view_header}>
        <button
          disabled={loading || error}
          onClick={() => setShowFilters(!showFilters)}
        >
          <TuneRoundedIcon />
          <span className={classes.pc_only}>
            {showFilters ? "Hide Filters" : "Show filters"}
          </span>
          <span className={classes.mobile_only}>Filters</span>
        </button>
        {!loading && !error && (
          <span className={classes.products_count}>
            {productsCount} Products
          </span>
        )}
      </div>
      <div className={classes.list_wrapper}>
        <ProductsFilters showFilters={showFilters} />
        <ProductsList
          error={error}
          loading={loading}
          products={products}
          productsCount={productsCount}
          fetchMoreProducts={fetchMoreProducts}
        />
      </div>
    </div>
  );
};

export default ProductsView;
