import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrencies } from "./currencyAPI";
import { Currency } from "@/types/currency";

interface CurrencyState {
  currencies: Currency[];
  loading: boolean;
  error: string | null;
}

const initialState: CurrencyState = {
  currencies: [],
  loading: false,
  error: null,
};

export const fetchCurrencies = createAsyncThunk(
  "currency/fetchCurrencies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrencies();
      console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch currencies"
      );
    }
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.currencies = action.payload.currencies;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default currencySlice.reducer;
