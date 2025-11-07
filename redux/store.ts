import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import businessReducer from "./features/business/businessSlice";
import apiKeyReducer from "./features/apiKey/apiKeySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    business: businessReducer,
    apiKey: apiKeyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
