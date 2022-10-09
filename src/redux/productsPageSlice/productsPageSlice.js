import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOAD_STATUSES } from "redux/constants";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get(
      `https://6328dc1dd2c97d8c525e3c1f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  loadStatus: LOAD_STATUSES.UNKNOWN,
};

export const { actions, reducer } = createSlice({
  name: "pizza",
  initialState,
  //   reducers: {
  //     setProducts: (state, action) => {
  //       state.items = action.payload;
  //     },
  //   },
  //   extraReducers: {
  //     [fetchPizzas.fulfilled]: (state, action) => {
  //       console.log(state);
  //     },
  //   },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.loadStatus = LOAD_STATUSES.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.loadStatus = LOAD_STATUSES.LOADED;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.loadStatus = LOAD_STATUSES.ERROR;
      state.items = [];
    });
  },
});
