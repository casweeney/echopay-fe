import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVirtualAccount } from "./accountAPI";
import { VirtualAccountData } from "@/types/account";

export interface VirtualAccountState {
  virtualAccount: VirtualAccountData | null;
  loading: boolean;
  error: string | null;
}

const initialState: VirtualAccountState = {
  virtualAccount: null,
  loading: false,
  error: null,
};

export const fetchVirtualAccount = createAsyncThunk(
  "account/fetchVirtualAccount",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getVirtualAccount(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVirtualAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVirtualAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.virtualAccount = action.payload.data;
      })
      .addCase(fetchVirtualAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default accountSlice.reducer;
