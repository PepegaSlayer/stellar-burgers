import { getFeedsApi, getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

export type FeedData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isOrdersLoading: boolean;
};

const initialState: FeedData = {
  orders: [],
  total: 0,
  totalToday: 0,
  isOrdersLoading: true
};

export const getFeeds = createAsyncThunk(
  'feeds/all',
  async () => await getFeedsApi()
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    setFeeds(
      state,
      action: PayloadAction<{
        orders: TOrder[];
        total: number;
        totalToday: number;
        isOrdersLoading: boolean;
      }>
    ) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.isOrdersLoading = action.payload.isOrdersLoading;
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isOrdersLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const feedsReducer = feedsSlice.reducer;
