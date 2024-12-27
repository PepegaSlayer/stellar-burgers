import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type IngredientsData = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
};

const initialState: IngredientsData = {
  ingredients: [],
  isIngredientsLoading: true
};

export const getIngredients = createAsyncThunk(
  'ingredients/all',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients(
      state,
      action: PayloadAction<{ ingredients: TIngredient[]; isLoading: boolean }>
    ) {
      state.ingredients = action.payload.ingredients;
      state.isIngredientsLoading = action.payload.isLoading;
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
