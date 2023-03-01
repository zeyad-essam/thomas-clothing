import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./Newsletter";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Layout;
