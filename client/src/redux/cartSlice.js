import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserCart = createAsyncThunk(
  "/cart/getCart",
  async (__, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/cart/get-user-cart`,
        {
          withCredentials: true,
        }
      );
      const userCart = response.data.cart;
      const localCart = JSON.parse(localStorage.getItem("cart"));
      const updatedCartItems = [...userCart];

      if (localCart && localCart.length >= 1) {
        localCart.forEach((item) => {
          const userCartProductIndex = userCart.findIndex((cp) => {
            return (
              cp.product._id.toString() === item.product._id.toString() &&
              cp.size === item.size
            );
          });

          let itemQuantity = item.quantity;

          if (userCartProductIndex >= 0) {
            itemQuantity += updatedCartItems[userCartProductIndex].quantity;
            updatedCartItems[userCartProductIndex].quantity = itemQuantity;
          } else {
            updatedCartItems.push({
              product: item.product,
              size: item.size,
              quantity: itemQuantity,
            });
          }
        });

        const userNewCart = updatedCartItems.map((item) => {
          return {
            product: item.product._id,
            size: item.size,
            quantity: item.quantity,
          };
        });
        await axios({
          url: `${process.env.REACT_APP_API_URL}/cart/set-user-cart`,
          method: "put",
          withCredentials: true,
          data: { cart: userNewCart },
        });
        localStorage.removeItem("cart");
      }
      const totalPrice = updatedCartItems.reduce((acc, cur) => {
        return acc + cur.product.price * cur.quantity;
      }, 0);

      return {
        items: updatedCartItems,
        totalPrice,
      };
    } catch (err) {
      const error = err.response
        ? err.response.data.message
        : "something went wrong";
      return rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  "/cart/addToCart",
  async ({ product, size }, { rejectWithValue, getState }) => {
    let cartItems;
    try {
      const user = getState().user;
      if (user.isAuthenticated) {
        const response = await axios({
          url: `${process.env.REACT_APP_API_URL}/cart/add-to-cart`,
          method: "post",
          withCredentials: true,
          data: {
            productId: product._id,
            size,
          },
        });
        cartItems = response.data.cart;
      } else {
        await axios.get(
          `${process.env.REACT_APP_API_URL}/products/check-availability`,
          {
            params: {
              productId: product._id,
              size: size,
            },
          }
        );

        const localCart = localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart"))
          : [];
        const cartProductIndex = localCart.findIndex((cp) => {
          return (
            cp.product._id.toString() === product._id.toString() &&
            cp.size === size
          );
        });
        let quantity = 1;

        const updatedCartItems = [...localCart];

        if (cartProductIndex >= 0) {
          quantity += localCart[cartProductIndex].quantity;
          updatedCartItems[cartProductIndex].quantity = quantity;
        } else {
          updatedCartItems.push({
            product: { ...product },
            size,
            quantity,
          });
        }
        cartItems = updatedCartItems;
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
      const totalPrice = cartItems.reduce((acc, cur) => {
        return acc + cur.product.price * cur.quantity;
      }, 0);

      return {
        items: cartItems,
        totalPrice,
      };
    } catch (err) {
      const error = err.response
        ? err.response.data.message
        : "something went wrong";
      return rejectWithValue(error);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "/cart/removeFromCart",
  async ({ product, size }, { rejectWithValue, getState }) => {
    let cartItems;
    try {
      const { user } = getState();
      if (user.isAuthenticated) {
        const response = await axios({
          url: `${process.env.REACT_APP_API_URL}/cart/remove-from-cart`,
          method: "delete",
          withCredentials: true,
          data: {
            productId: product._id,
            size,
          },
        });
        cartItems = response.data.cart;
      } else {
        const localCart = localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart"))
          : [];

        const updatedCartItems = localCart.filter((cp) => {
          return !(
            cp.product._id.toString() === product._id.toString() &&
            cp.size === size
          );
        });

        cartItems = updatedCartItems;
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
      const totalPrice = cartItems.reduce((acc, cur) => {
        return acc + cur.product.price * cur.quantity;
      }, 0);

      return {
        items: cartItems,
        totalPrice,
      };
    } catch (err) {
      const error = err.response
        ? err.response.data.message
        : "something went wrong";
      return rejectWithValue(error);
    }
  }
);

const localCartItems = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const localCartTotalPrice = localCartItems.reduce((acc, cur) => {
  return acc + cur.product.price * cur.quantity;
}, 0);

const initialState = {
  items: localCartItems,
  totalPrice: localCartTotalPrice,
  loading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    resetCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserCart.fulfilled, (state, { payload }) => {
        state.items = payload.items;
        state.totalPrice = payload.totalPrice;
        state.loading = false;
      })
      .addCase(getUserCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.items = payload.items;
        state.totalPrice = payload.totalPrice;
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        state.items = payload.items;
        state.totalPrice = payload.totalPrice;
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetCart, setLoading } = cartSlice.actions;

export default cartSlice.reducer;
