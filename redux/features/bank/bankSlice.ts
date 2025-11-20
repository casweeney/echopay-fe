import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBanks } from "./bankAPI";
import { BanksData } from "@/types/bank";

export interface BankState {
  banks: BanksData | null;
  loading: boolean;
  error: string | null;
}

export const initialBankState: BankState = {
  banks: null,
  loading: false,
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
      });
  },
});

export default bankSlice.reducer;
