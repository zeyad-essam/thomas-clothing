import React, { useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getUser } from "./redux/userSlice";

import HomePage from "./pages/HomePage";

import AuthRoutes from "./routes/AuthRoutes";
import ProductsRoutes from "./routes/ProductsRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/products/*" element={<ProductsRoutes />} />
      </Routes>
    </Layout>
  );
}

export default App;
