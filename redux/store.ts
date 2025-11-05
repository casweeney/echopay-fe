import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import businessReducer from "./features/business/businessSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    business: businessReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
