import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import productsSlice from "./productsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productsSlice,
  },
});
