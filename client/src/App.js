import React, { useCallback, useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getUser } from "./redux/userSlice";
import { getUserCart, setLoading } from "./redux/cartSlice";

import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import PrivacyPolicy from "./pages/static/PrivacyPolicy";
import TermsAndConditions from "./pages/static/TermsAndConditions";
import AboutUs from "./pages/static/AboutUs";
import CheckoutSuccessPage from "./pages/checkout/CheckoutSuccessPage";
import ContactPage from "./pages/ContactPage";
import FaqsPage from "./pages/FaqsPage";

import AuthRoutes from "./routes/AuthRoutes";
import ProductsRoutes from "./routes/ProductsRoutes";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

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
    <Elements stripe={stripePromise}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/products/*" element={<ProductsRoutes />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faq" element={<FaqsPage />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        limit={1}
        hideProgressBar={false}
        progressStyle={{ color: "#212121" }}
        newestOnTop={false}
        closeOnClick={false}
        transition={Slide}
        pauseOnFocusLoss
        draggable
        draggablePercent={50}
        pauseOnHover
        theme="light"
      />
    </Elements>
  );
}

export default App;
