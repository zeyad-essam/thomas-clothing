import React from "react";

import PageHeader from "../../components/UI/PageHeader";
import ProductsView from "../../components/products/ProductsView";

const JacketsAndCoats = () => {
  return (
    <>
      <PageHeader
        title="Men's jackets & coats"
        text="Discover our wide selection of stylish jackets and coats for men: from
        leather jackets to bombers, vests, peacoats and puffer jackets."
      />
      <ProductsView category="jackets-and-coats" />
    </>
  );
};

export default JacketsAndCoats;
