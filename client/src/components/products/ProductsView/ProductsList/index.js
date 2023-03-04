import React from "react";
import PageLoading from "../../../UI/PageLoading";
import ProductItem from "./ProductItem";
import InfiniteScroll from "react-infinite-scroll-component";
import PuffLoader from "react-spinners/PuffLoader";

import classes from "./ProductsList.module.css";

const ProductsList = ({
  loading,
  error,
  products,
  productsCount,
  onNextPage,
}) => {
  return (
    <div className={classes.products_list}>
      {loading && <PageLoading />}
      {!loading && error && (
        <div className={classes.error}>Something went wrong!</div>
      )}
      {!loading && !error && (
        <InfiniteScroll
          className={classes.infinite_scroll}
          hasMore={products.length !== productsCount}
          next={onNextPage}
          dataLength={products.length}
          scrollThreshold={0.6}
          loader={
            <div className={classes.load_more}>
              <PuffLoader color="#212121" />
            </div>
          }
        >
          <ul>
            {products.map((product) => (
              <ProductItem key={product.slug} product={product} />
            ))}
          </ul>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ProductsList;
