import React, { useCallback, useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getUser } from "./redux/userSlice";
import { getUserCart, setLoading } from "./redux/cartSlice";

import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";

import AuthRoutes from "./routes/AuthRoutes";
import ProductsRoutes from "./routes/ProductsRoutes";

function App() {
  const dispatch = useDispatch();

  const getUserData = useCallback(async () => {
    try {
      // get the user data if the user is authenticated
      await dispatch(getUser()).unwrap();
      // get the user cart and combine it with the local storage cart
      await dispatch(getUserCart()).unwrap();
    } catch (error) {
      // set the cart loading state to false if the user is not authenticated
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

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
