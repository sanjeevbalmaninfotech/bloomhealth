import { configureStore } from '@reduxjs/toolkit';
import { auth } from './src/services/authAPI';
import { user } from './src/services/userAPI';
import userReducer from './src/services/slices/userSlice';

export const store = configureStore({
  reducer: {
    userSlice: userReducer,
    [auth.reducerPath]: auth.reducer,
    [user.reducerPath]: user.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(auth.middleware, user.middleware),
});
