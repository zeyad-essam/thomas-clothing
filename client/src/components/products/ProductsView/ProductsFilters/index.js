import React, { useEffect, useRef, useState } from "react";

import Slider from "@mui/material/Slider";

import { useSelector } from "react-redux";

import { useMediaQuery } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import Backdrop from "../../../UI/Backdrop";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import classes from "./ProductsFilters.module.css";

const ProductsFilters = ({
  showFilters,
  onHideFilters,
  queryParams,
  onColorSelect,
  onPriceRangeSelect,
  onSizeSelect,
  onQueryReset,
}) => {
  const { loading, productsCount, filterData } = useSelector(
    (state) => state.products
  );
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const isPc = useMediaQuery("(min-width:991.8px)");
  const productsFilterRef = useRef();

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceRangeCommitted = (event, newValue) => {
    onPriceRangeSelect(newValue);
  };

  useEffect(() => {
    const queryPriceRange = queryParams.priceRange;
    if (filterData.maxPrice && !queryPriceRange) {
      setPriceRange([0, filterData.maxPrice]);
    }
    if (queryPriceRange) {
      setPriceRange([Number(queryPriceRange[0]), Number(queryPriceRange[1])]);
    }
  }, [filterData.maxPrice, queryParams.priceRange]);

  useEffect(() => {
    const disableScrollOnMobile = () => {
      if (showFilters && !isPc) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
    };

    disableScrollOnMobile();
    window.addEventListener("resize", disableScrollOnMobile);
    return () => {
      document.body.style.overflow = "visible";
      window.removeEventListener("resize", disableScrollOnMobile);
    };
  }, [showFilters, isPc]);

  useEffect(() => {
    // close the filters whenever the user clicks outside the filters wrapper
    function handleClickOutside(event) {
      if (
        showFilters &&
        productsFilterRef.current &&
        !productsFilterRef.current.contains(event.target)
      ) {
        onHideFilters();
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [productsFilterRef, onHideFilters, showFilters]);

  return (
    <>
      <div
        ref={productsFilterRef}
        className={`${classes.products_filters_wrapper} ${
          showFilters ? classes.is_expanded : ""
        }`}
      >
        <header className={classes.filters_header}>
          <span onClick={onQueryReset}>Clear All</span>
          <button onClick={onHideFilters}>
            <CloseRoundedIcon />
          </button>
        </header>
        <div className={classes.products_filters_inner}>
          <div className={classes.filters_section}>
            <h3>Color</h3>
            <ul className={classes.colors_list}>
              {filterData.colors.map((color) => (
                <li
                  key={color.text}
                  className={
                    queryParams.colors?.includes(color.text)
                      ? classes.selected
                      : ""
                  }
                  onClick={onColorSelect.bind(null, color.text)}
                >
                  <span style={{ backgroundColor: color.hex }}></span>
                  {color.text}
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.filters_section}>
            <h3>Price</h3>
            <div className={classes.slider_wrapper}>
              <Slider
                getAriaLabel={() => "Price range"}
                value={priceRange}
                onChange={handlePriceRangeChange}
                onChangeCommitted={handlePriceRangeCommitted}
                valueLabelDisplay="auto"
                min={0}
                max={filterData.maxPrice}
                step={50}
                sx={{
                  color: "#212121",
                  width: "95%",
                  padding: "13px 0 !important",
                }}
              />
              <div className={classes.range_titles}>
                <span>Min</span>
                <span>Max</span>
              </div>
            </div>
          </div>
          <div className={classes.filters_section}>
            <h3>Size</h3>
            <ul className={classes.sizes_list}>
              {filterData.sizes.map((size) => (
                <li
                  key={size}
                  className={
                    queryParams.sizes?.includes(size) ? classes.selected : ""
                  }
                  onClick={onSizeSelect.bind(null, size)}
                >
                  {size}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={`${classes.view_products} ${loading && classes.loading}`}
          onClick={onHideFilters}
        >
          View Products ({productsCount})
        </div>
      </div>
      <AnimatePresence>
        {!isPc && showFilters && <Backdrop onClose={onHideFilters} />}
      </AnimatePresence>
    </>
  );
};

export default ProductsFilters;
