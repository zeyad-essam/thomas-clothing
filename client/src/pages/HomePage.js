import React from "react";
import ProductsPoster from "../components/home/ProductsPoster";
import CategoryView from "../components/home/CategoryView";
import Hero from "../components/home/Hero";
import ProductHighlights from "../components/home/ProductsHighlights";

import {
  shirtsViewData,
  jacketsAndCoatsViewData,
} from "../utils/categoryViewsData";

import { sweatShirtsPoster } from "../utils/productsPoster";

const HomePage = () => {
  return (
    <div className="container">
      <Hero />
      <ProductHighlights />
      <CategoryView data={shirtsViewData} />
      <ProductsPoster data={sweatShirtsPoster} />
      <CategoryView data={jacketsAndCoatsViewData} reverse />
    </div>
  );
};

export default HomePage;
