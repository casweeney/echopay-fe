import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBankDetails, getBanks } from "./bankAPI";
import {
  BankDetailsPayload,
  BankDetailsResponse,
  BanksData,
} from "@/types/bank";

export interface BankState {
  banks: BanksData | null;
  bankDetails: BankDetailsResponse | null;
  loading: boolean;
  fetchingDetails: boolean;
  error: string | null;
}

export const initialBankState: BankState = {
  banks: null,
  bankDetails: null,
  loading: false,
  fetchingDetails: false,
  error: null,
};

export const fetchBanks = createAsyncThunk(
  "bank/fetchBanks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBanks();
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
    }
  }
);

export const fetchBankDetails = createAsyncThunk(
  "bank/fetchBankDetails",
  async (payload: BankDetailsPayload, { rejectWithValue }) => {
    try {
      const response = await getBankDetails(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
    }
  }
);

const bankSlice = createSlice({
  name: "bank",
  initialState: initialBankState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanks.fulfilled, (state, action) => {
        state.loading = false;
        state.banks = action.payload.data;
      })
      .addCase(fetchBanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBankDetails.pending, (state) => {
        state.fetchingDetails = true;
      })
      .addCase(fetchBankDetails.fulfilled, (state, action) => {
        state.fetchingDetails = false;
        state.bankDetails = action.payload;
      })
      .addCase(fetchBankDetails.rejected, (state, action) => {
        state.fetchingDetails = false;
        state.bankDetails = null;
        state.error = action.error as string;
      });
  },
});

export default bankSlice.reducer;
