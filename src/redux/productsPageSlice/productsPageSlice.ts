import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOAD_STATUSES } from "../constants";

type Pizza = {
  id: string;
  title: string;
  imageUrl: string;
  sizes: number[];
  price: number;
  types: number[];
}

enum Status {
  LOADING = "LOADING",
  LOADED = "LOADED",
  ERROR = "ERROR",
  UNKNOWN = "UNKNOWN",
}

interface PizzaSliceState {
  items: Pizza[],
  loadStatus: Status
}

const initialState: PizzaSliceState = {
  items: [],
  loadStatus: Status.UNKNOWN
};

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://6328dc1dd2c97d8c525e3c1f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
    });

export const { actions, reducer } = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.loadStatus = Status.LOADING
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.loadStatus = Status.LOADED;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.loadStatus = Status.ERROR;
      state.items = [];
    });
  },
});
