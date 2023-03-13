import React, { useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/userSlice";
import { getUserCart } from "./redux/cartSlice";

import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";

import AuthRoutes from "./routes/AuthRoutes";
import ProductsRoutes from "./routes/ProductsRoutes";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user.isAuthenticated) {
      dispatch(getUserCart());
    }
  }, [user.isAuthenticated, dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/products/*" element={<ProductsRoutes />} />
      </Routes>
    </Layout>
  );
}

export default App;
