import React, { useEffect, useRef } from "react";

import classes from "./ProductsFilters.module.css";

const ProductsFilters = ({
  showFilters,
  onHideFilters,
  filterData,
  queryParams,
  onColorSelect,
  onSizeSelect,
}) => {
  const productsFilterRef = useRef();

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
    <div
      ref={productsFilterRef}
      className={`${classes.products_filters_wrapper} ${
        showFilters ? classes.is_expanded : ""
      }`}
    >
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
    </div>
  );
};

export default ProductsFilters;
