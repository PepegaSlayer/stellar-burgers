import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from './slices/ingredients-slice';
import { ConstructorReducer } from './slices/constructor.slice';
import { feedsReducer } from './slices/feed-slice';
import { UserReducer } from './slices/user-slice';

export const rootReducer = combineReducers({
  ingredientsReducer,
  ConstructorReducer,
  feedsReducer,
  UserReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
