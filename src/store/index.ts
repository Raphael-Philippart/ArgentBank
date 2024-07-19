import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import {authMiddleware} from './middleware/authMiddleware';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
