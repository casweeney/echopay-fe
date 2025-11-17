// src/redux/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "@/utils/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import businessReducer from "./features/business/businessSlice";
import apiKeyReducer from "./features/apiKey/apiKeySlice";
import webhookReducer from "./features/webhookURL/webhookSlice";
import regionReducer from "./features/region/regionSlice";
import walletReducer from "./features/wallet/walletSlice";
import currencyReducer from "./features/currency/currencySlice";
import accountReducer from "./features/account/accountSlice";
import bankReducer from "./features/bank/bankSlice";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  business: businessReducer,
  apiKey: apiKeyReducer,
  webhook: webhookReducer,
  region: regionReducer,
  wallet: walletReducer,
  currency: currencyReducer,
  account: accountReducer,
  bank: bankReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    // "user",
    // "business",
    // "apiKey",
    // "webhook",
    // "region",
    // "wallet",
    // "currency",
    // "account",
    // "bank",
  ], // State slices to persist
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
