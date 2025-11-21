import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "./transactionAPI";
import { GetTransactionsResponse } from "@/types/transaction";

interface ApiKeysState {
  transactions: GetTransactionsResponse | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: ApiKeysState = {
  transactions: null,
  loading: false,
  error: null,
  success: null,
};

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getTransactions(id);
      console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionsSlice.reducer;
