import React from "react";
import { Route, Routes } from "react-router-dom";
import BlazersAndSuits from "../pages/products/BlazersAndSuits";
import Denim from "../pages/products/Denim";
import JacketsAndCoats from "../pages/products/JacketsAndCoats";
import Shirts from "../pages/products/Shirts";
import Sweatshirts from "../pages/products/Sweatshirts";

const ProductsRoutes = () => {
  return (
    <Routes>
      <Route path="jackets-and-coats" element={<JacketsAndCoats />} />
      <Route path="shirts" element={<Shirts />} />
      <Route path="denim" element={<Denim />} />
      <Route path="sweatshirts" element={<Sweatshirts />} />
      <Route path="blazers-and-suits" element={<BlazersAndSuits />} />
    </Routes>
  );
};

export default ProductsRoutes;
