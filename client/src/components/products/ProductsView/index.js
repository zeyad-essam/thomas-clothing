import React, { useEffect, useState, useCallback } from "react";

import ProductsList from "./ProductsList";

import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

import axios from "axios";

import classes from "./ProductsView.module.css";

import { useQueryParams, ArrayParam, NumberParam } from "use-query-params";
import ProductsFilters from "./ProductsFilters";

const ProductsView = ({ category }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const [queryParams, setQueryParams] = useQueryParams(
    {
      colors: ArrayParam,
      sizes: ArrayParam,
      min_price: NumberParam,
      max_price: NumberParam,
    },
    { arrayFormat: "repeat" }
  );

  const fetchProducts = useCallback(async () => {
    setPage(1);
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

  const fetchMoreProducts = useCallback(async () => {
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
  }, [page, queryParams, category]);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchProducts();
  }, [queryParams, fetchProducts]);

  useEffect(() => {
    fetchMoreProducts();
  }, [page, fetchMoreProducts]);

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
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};

export default ProductsView;
