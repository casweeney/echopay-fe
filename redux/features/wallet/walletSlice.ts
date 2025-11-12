import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createWallet, getWallets } from "./walletAPI";
import {
  CreateWalletPayload,
  CreateWalletResponse,
  Wallet,
} from "@/types/wallet";

interface WalletState {
  wallet: CreateWalletResponse | null;
  wallets: Wallet[];
  loading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  wallet: null,
  wallets: [],
  loading: false,
  error: null,
};

export const createBusinessWallet = createAsyncThunk(
  "wallet/createBusinessWallet",
  async (payload: CreateWalletPayload, { rejectWithValue }) => {
    try {
      const response = await createWallet(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create wallet");
    }
  }
);

export const fetchWallets = createAsyncThunk(
  "wallet/fetchWallets",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getWallets(id);
      //   console.log(response);
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
      })
      .addCase(createBusinessWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBusinessWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload;
      })
      .addCase(createBusinessWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default walletSlice.reducer;
