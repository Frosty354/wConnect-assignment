import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Your userSlice or other reducers

// Define a type for the root state
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    user: userReducer, // Your userReducer or other reducers
  },
});

// Define types for Thunk actions
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default store;
