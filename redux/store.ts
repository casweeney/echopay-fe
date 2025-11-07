// src/redux/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "@/utils/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import businessReducer from "./features/business/businessSlice";
import apiKeyReducer from "./features/apiKey/apiKeySlice";
import webhookReducer from "./features/webhookURL/webhookSlice";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  business: businessReducer,
  apiKey: apiKeyReducer,
  webhook: webhookReducer,
});

// Persist config — choose what to persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "business"], // only persist these slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
