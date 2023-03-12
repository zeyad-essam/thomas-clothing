import React, { useEffect, useState, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getProducts, resetProducts } from "../../../redux/productsSlice";

import { useQueryParams, ArrayParam } from "use-query-params";

import ProductsList from "./ProductsList";
import ProductsFilters from "./ProductsFilters";

import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

import classes from "./ProductsView.module.css";

const ProductsView = ({ category }) => {
  const dispatch = useDispatch();
  const { productsCount, filterData, error } = useSelector(
    (state) => state.products
  );
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const [queryParams, setQueryParams] = useQueryParams(
    {
      colors: ArrayParam,
      sizes: ArrayParam,
      priceRange: ArrayParam /* [minPrice, maxPrice] */,
    },
    { updateType: "replace" }
  );

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

  const handlePriceRandeChange = (value) => {
    if (value[0] === 0 && value[1] === filterData.maxPrice) {
      setQueryParams({
        ...queryParams,
        priceRange: undefined,
      });
      return;
    }
    setQueryParams({
      ...queryParams,
      priceRange: value,
    });
  };

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

  const resetPriceRange = () => {
    setQueryParams(
      { ...queryParams, priceRange: undefined },
      { replaceInHistory: true }
    );
  };

  const resetQueryParams = useCallback(() => {
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

  const onNextPage = () => {
    dispatch(getProducts({ queryParams, page: page + 1, category }));
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    setPage(1);
    dispatch(getProducts({ queryParams, page: 1, category }));
  }, [queryParams, dispatch, category]);

  useEffect(() => {
    return () => {
      dispatch(resetProducts());
    };
  }, [dispatch]);

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
          queryParams={queryParams}
          onHideFilters={hideFilters}
          onColorSelect={handleColorChange}
          onPriceRangeSelect={handlePriceRandeChange}
          onSizeSelect={handleSizeChange}
          onQueryReset={resetQueryParams}
        />
        <ProductsList
          onNextPage={onNextPage}
          queryParams={{ ...queryParams }}
          onColorRemove={handleColorChange}
          onSizeRemove={handleSizeChange}
          onPriceRangeReset={resetPriceRange}
          onQueryReset={resetQueryParams}
        />
      </div>
    </div>
  );
};

export default ProductsView;
