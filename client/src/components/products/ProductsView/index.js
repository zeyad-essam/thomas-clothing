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
  const [page, setPage] = useState(1);
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
    let queryObject = { ...queryParams, page };
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

      console.log(response);

      setProducts((prevProducts) => [
        ...prevProducts,
        ...response.data.products,
      ]);

      if (page === 1) {
        setProductsCount(response.data.productsCount);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [queryParams, page, category]);

  const nextPageHandler = () => {
    setPage((prevPage) => prevPage + 1);
  };

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
          onNextPage={nextPageHandler}
        />
      </div>
    </div>
  );
};

export default ProductsView;
