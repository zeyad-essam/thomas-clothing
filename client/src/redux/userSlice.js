import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("/user/getUser", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/auth/getuser`,
    {
      withCredentials: true,
    }
  );
  console.log(response.data);
  return response.data.user;
});

const initialState = {
  isAuthenticated: false,
  userData: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setState(state, { payload }) {
      state = payload;
    },
  },
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
      });
  },
});

export const { setState } = userSlice.actions;

export default userSlice.reducer;
