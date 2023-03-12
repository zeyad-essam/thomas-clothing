import React, { memo } from "react";
import ProductItem from "./ProductItem";

import { useSelector } from "react-redux";

import GridLoader from "react-spinners/GridLoader";
import PuffLoader from "react-spinners/PuffLoader";

import InfiniteScroll from "react-infinite-scroll-component";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import classes from "./ProductsList.module.css";

const ProductsList = ({
  onNextPage,
  queryParams,
  onColorRemove,
  onSizeRemove,
  onPriceRangeReset,
  onQueryReset,
}) => {
  const { loading, products, productsCount, error } = useSelector(
    (state) => state.products
  );
  const nextPageHandler = () => {
    onNextPage();
  };

  const selectedColors = queryParams.colors;

  const selectedSizes = queryParams.sizes;

  const selectedPriceRange = queryParams.priceRange;

  const hasSelectedFilters =
    selectedColors || selectedSizes || selectedPriceRange;

  return (
    <div className={classes.products_list_wrapper}>
      {loading && (
        <div className={classes.loading_wrapper}>
          <GridLoader color="#524d49" size={13} />
        </div>
      )}
      {!loading && error && (
        <div className={`${classes.notify} ${classes.error}`}>
          Something went wrong!
        </div>
      )}
      {!error && (
        <InfiniteScroll
          className={classes.infinite_scroll}
          hasMore={products.length !== productsCount}
          next={nextPageHandler}
          dataLength={products.length}
          scrollThreshold={0.6}
          loader={
            <div className={classes.load_more}>
              <PuffLoader color="#212121" />
            </div>
          }
        >
          {hasSelectedFilters && (
            <div className={classes.selected_filters}>
              <ul>
                <li
                  className={classes.clear_all}
                  onClick={(e) => {
                    e.stopPropagation();
                    onQueryReset();
                  }}
                >
                  Clear All
                </li>
                {selectedPriceRange && (
                  <li
                    className={classes.remove_filter}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPriceRangeReset();
                    }}
                  >
                    <span>
                      <CloseRoundedIcon
                        style={{ fontSize: 17, color: "#242328" }}
                      />
                    </span>
                    From {selectedPriceRange[0]}$ to {selectedPriceRange[1]}$
                  </li>
                )}
                {queryParams.colors &&
                  queryParams.colors.map((color) => (
                    <li
                      key={color}
                      className={classes.remove_filter}
                      onClick={(e) => {
                        e.stopPropagation();
                        onColorRemove(color);
                      }}
                    >
                      <span>
                        <CloseRoundedIcon
                          style={{ fontSize: 17, color: "#242328" }}
                        />
                      </span>
                      {color}
                    </li>
                  ))}
                {queryParams.sizes &&
                  queryParams.sizes.map((size) => (
                    <li
                      key={size}
                      className={classes.remove_filter}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSizeRemove(size);
                      }}
                    >
                      <span>
                        <CloseRoundedIcon
                          style={{ fontSize: 17, color: "#242328" }}
                        />
                      </span>
                      Size {size}
                    </li>
                  ))}
              </ul>
            </div>
          )}
          {!loading && products.length < 1 && (
            <div className={classes.notify}>No products found.</div>
          )}
          {products.length >= 1 && (
            <ul
              className={`${classes.products_list} ${
                hasSelectedFilters && classes.filters_selected
              }`}
            >
              {products.map((product) => (
                <ProductItem key={product.slug} product={product} />
              ))}
            </ul>
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default memo(ProductsList);
