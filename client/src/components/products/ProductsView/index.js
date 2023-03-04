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
  const [nextPage, setNextPage] = useState(2);
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [filterData, setFilterData] = useState({
    maxPrice: 5000,
    colors: [],
    sizes: [],
  });

  const [queryParams, setQueryParams] = useQueryParams(
    {
      colors: ArrayParam,
      sizes: ArrayParam,
      priceRange: ArrayParam /* [minPrice, maxPrice] */,
    },
    { arrayFormat: "repeat" }
  );

  const fetchProducts = useCallback(
    async (page) => {
      if (!page) {
        page = 1;
        setLoading(true);
      }
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

        if (page === 1) {
          const { products, productsCount, filterData } = response.data;
          setProducts(products);

          setProductsCount(productsCount);

          setFilterData(filterData);
        } else {
          setProducts((prevProducts) => [
            ...prevProducts,
            ...response.data.products,
          ]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [queryParams, category]
  );

  const onNextPage = useCallback(() => {
    fetchProducts(nextPage);
    setNextPage((prevPage) => prevPage + 1);
  }, [fetchProducts, nextPage]);

  const handleColorChange = useCallback(
    (color) => {
      if (!queryParams.colors) {
        setQueryParams({
          ...queryParams,
          colors: [color],
        });
        return;
      }

      if (queryParams.colors.includes(color)) {
        setQueryParams({
          ...queryParams,
          colors: queryParams.colors.filter((c) => c !== color),
        });
      } else {
        setQueryParams({
          ...queryParams,
          colors: [...queryParams.colors, color],
        });
      }
    },
    [queryParams, setQueryParams]
  );

  const handleSizeChange = useCallback(
    (size) => {
      if (!queryParams.sizes) {
        setQueryParams({
          ...queryParams,
          sizes: [size],
        });
        return;
      }
      if (queryParams.sizes.includes(size)) {
        setQueryParams({
          ...queryParams,
          sizes: queryParams.sizes.filter((s) => s !== size),
        });
      } else {
        setQueryParams({ ...queryParams, sizes: [...queryParams.sizes, size] });
      }
    },
    [queryParams, setQueryParams]
  );

  const resetQueryParams = useCallback(() => {
    console.log("test");
    setQueryParams({
      colors: undefined,
      sizes: undefined,
      priceRange: undefined,
    });
  }, [setQueryParams]);

  const showFiltersHandler = useCallback((e) => {
    e.stopPropagation();
    setShowFilters((prevVal) => !prevVal);
  }, []);

  const hideFilters = useCallback(() => {
    setShowFilters(false);
  }, []);

  useEffect(() => {
    setNextPage(2);
    fetchProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [queryParams, fetchProducts]);

  const hasSelectedFilters =
    queryParams.colors || queryParams.sizes || queryParams.priceRange;

  return (
    <div className="container">
      <div className={classes.products_view_header}>
        <button
          disabled={productsCount === 0 && !hasSelectedFilters}
          // only disable the button if there is no products and there is no filters selected
          // (initial load or empty category page)
          onClick={showFiltersHandler}
        >
          <TuneRoundedIcon />
          <span className={classes.pc_only}>
            {showFilters ? "Hide Filters" : "Show filters"}
          </span>
          <span className={classes.mobile_only}>Filters</span>
        </button>
        <span className={classes.products_count}>
          {!error && productsCount} Products
        </span>
      </div>
      <div className={classes.list_wrapper}>
        <ProductsFilters
          showFilters={showFilters}
          onHideFilters={hideFilters}
          loading={loading}
          filterData={filterData}
          queryParams={queryParams}
          onColorSelect={handleColorChange}
          onSizeSelect={handleSizeChange}
        />
        <ProductsList
          error={error}
          loading={loading}
          products={products}
          productsCount={productsCount}
          onNextPage={onNextPage}
          queryParams={{ ...queryParams }}
          onColorRemove={handleColorChange}
          onSizeRemove={handleSizeChange}
          onQueryReset={resetQueryParams}
        />
      </div>
    </div>
  );
};

export default ProductsView;
