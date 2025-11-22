import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBusinessTransactions, getTransactions } from "./transactionAPI";
import {
  BusinessTransactionResponse,
  GetTransactionsResponse,
} from "@/types/transaction";

interface ApiKeysState {
  transactions: GetTransactionsResponse | null;
  businessTransactions: BusinessTransactionResponse | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: ApiKeysState = {
  transactions: null,
  businessTransactions: null,
  loading: false,
  error: null,
  success: null,
};

export const fetchTransactions = createAsyncThunk<
  GetTransactionsResponse,
  { id: string; page: number },
  { rejectValue: string }
>(
  "transaction/fetchTransactions",
  async ({ id, page }: { id: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await getTransactions(id, page);
      console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ?? "An error occurred"
      );
    }
  }
);

export const fetchBusinessTransactions = createAsyncThunk<
  BusinessTransactionResponse,
  { id: string; page: number; status: string; type: string },
  { rejectValue: string }
>(
  "transaction/fetchBusinessTransactions",
  async (
    {
      id,
      page,
      status,
      type,
    }: { id: string; page: number; status: string; type: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getBusinessTransactions(id, page, status, type);
      console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ?? "An error occurred"
      );
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
      })
      .addCase(fetchBusinessTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBusinessTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.businessTransactions = action.payload;
      })
      .addCase(fetchBusinessTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionsSlice.reducer;
