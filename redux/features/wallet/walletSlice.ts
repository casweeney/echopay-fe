import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWallets } from "./walletAPI";
import { Wallet } from "@/types/wallet";

interface WalletState {
  wallets: Wallet[];
  loading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  wallets: [],
  loading: false,
  error: null,
};

export const fetchWallets = createAsyncThunk(
  "wallet/fetchWallets",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getWallets(id);
      console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch wallets");
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWallets.fulfilled, (state, action) => {
        state.loading = false;
        state.wallets = action.payload.wallets || [];
      })
      .addCase(fetchWallets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default walletSlice.reducer;
