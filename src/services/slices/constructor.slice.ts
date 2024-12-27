import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

interface IConstructorItems {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

interface IConstructorData {
  constructorItems: IConstructorItems;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: IConstructorData = {
  constructorItems: { bun: null, ingredients: [] },
  orderRequest: false,
  orderModalData: null
};

export const orderBurger = createAsyncThunk(
  'burger/order',
  async (data: string[]) => await orderBurgerApi(data)
);

const ConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setConstructor(
      state,
      action: PayloadAction<{
        constructorItems: IConstructorItems;
        orderRequest: boolean;
        orderModalData: TOrder;
      }>
    ) {
      state.constructorItems = action.payload.constructorItems;
      state.orderModalData = action.payload.orderModalData;
      state.orderRequest = action.payload.orderRequest;
    },
    setBun(state, action: PayloadAction<TIngredient>) {
      state.constructorItems.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.ingredients = [
        ...state.constructorItems.ingredients,
        action.payload
      ];
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i.id !== action.payload.id
        );
    },
    closeModal: (state) => {
      state.constructorItems = { bun: null, ingredients: [] };
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderModalData = null;
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(orderBurger.rejected, (state) => {
        console.log('Order Error');
      });
  }
});

export const { setBun, addIngredient, removeIngredient, closeModal } =
  ConstructorSlice.actions;
export const ConstructorReducer = ConstructorSlice.reducer;
