import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "/user/getProducts",
  async (args, { dispatch }) => {
    let { queryParams, page, category } = args;

    if (!page) {
      page = 1;
    }

    if (page === 1) {
      dispatch(productsSlice.actions.setLoading());
    }

    let queryObject = { ...queryParams, page };

    if (category) {
      queryObject.category = category;
    }

    const response = await axios.get("/api/products/get-products/", {
      params: queryObject,
    });

    if (page === 1) {
      const { products, productsCount, filterData } = response.data;
      return {
        firstPage: true,
        products,
        productsCount,
        filterData,
      };
    } else {
      return {
        firstPage: false,
        products: response.data.products,
      };
    }
  }
);

const initialState = {
  loading: true,
  products: [],
  productsCount: 0,
  filterData: {
    maxPrice: 5000,
    colors: [],
    sizes: [],
  },
  error: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    resetProducts: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        if (payload.firstPage) {
          state.products = payload.products;
          state.productsCount = payload.productsCount;
          state.filterData = payload.filterData;
        } else {
          state.products = [...state.products, ...payload.products];
        }
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetProducts } = productsSlice.actions;

export default productsSlice.reducer;
