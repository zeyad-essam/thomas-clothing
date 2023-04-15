import React from "react";
import { Route, Routes } from "react-router-dom";
import BlazersAndSuits from "../pages/products/BlazersAndSuits";
import Denim from "../pages/products/Denim";
import JacketsAndCoats from "../pages/products/JacketsAndCoats";
import Shirts from "../pages/products/Shirts";
import Sweatshirts from "../pages/products/Sweatshirts";
import ProductDetailsPage from "../pages/products/ProductDetailsPage";
import Explore from "../pages/products/Explore";

const ProductsRoutes = () => {
  return (
    <Routes>
      <Route path="jackets-and-coats" element={<JacketsAndCoats />} />
      <Route path="shirts" element={<Shirts />} />
      <Route path="denim" element={<Denim />} />
      <Route path="sweatshirts" element={<Sweatshirts />} />
      <Route path="blazers-and-suits" element={<BlazersAndSuits />} />
      <Route path="explore" element={<Explore />} />
      <Route
        path="product-details/:productSlug"
        element={<ProductDetailsPage />}
      />
    </Routes>
  );
};

export default ProductsRoutes;
