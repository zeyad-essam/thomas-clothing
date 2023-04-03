import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { resetCart } from "./cartSlice";

export const getUser = createAsyncThunk(
  "/user/getUser",
  async (__, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/auth/getuser`,
        {
          withCredentials: true,
        }
      );
      return response.data.user;
    } catch (err) {
      const error = err.response
        ? err.response.data.message
        : "something went wrong";
      return rejectWithValue(error);
    }
  }
);

export const userLogin = createAsyncThunk(
  "/user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        data: {
          email: email,
          password: password,
        },
        withCredentials: true,
        url: "/api/auth/login",
      });
      return response.data.user;
    } catch (err) {
      const error = err.response
        ? err.response.data.message
        : "something went wrong";
      return rejectWithValue(error);
    }
  }
);

export const userSignup = createAsyncThunk(
  "/user/signup",
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "PUT",
        data: {
          email: email,
          username: username,
          password: password,
        },
        url: "/api/auth/signup",
        withCredentials: true,
      });
      console.log(response.data.user);
      return response.data.user;
    } catch (err) {
      const error = err.response
        ? err.response.data.message
        : "something went wrong";
      return rejectWithValue(error);
    }
  }
);

export const userLogout = createAsyncThunk(
  "/user/logout",
  async (__, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get("/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(resetCart());
      return response.data.message;
    } catch (err) {
      const error = err.response
        ? err.response.data.message
        : "something went wrong";
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  userData: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isAuthenticated = true;
        state.userData = payload;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.userData = payload;
        state.isAuthenticated = true;
      })
      .addCase(userSignup.fulfilled, (state, { payload }) => {
        state.userData = payload;
        state.isAuthenticated = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.userData = null;
        state.isAuthenticated = false;
      });
  },
});

export default userSlice.reducer;
