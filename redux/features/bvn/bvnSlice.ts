import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBvnStatus, verifyBVN } from "./bvnAPI";
import {
  BVNVStatusResponse,
  VerifyBVNPayload,
  VerifyBVNResponse,
} from "@/types/bvn";

interface BvnStatusState {
  verifyRes: VerifyBVNResponse | null;
  bvnStatus: BVNVStatusResponse | null;
  message: string;
  loading: boolean;
  error: string | null;
}

const initialState: BvnStatusState = {
  verifyRes: null,
  bvnStatus: null,
  message: "",
  loading: false,
  error: null,
};

// Fetch BVN status
export const fetchBvnStatus = createAsyncThunk(
  "bvn/fetchBvnStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBvnStatus();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response.data.message || "Failed to BVN status"
      );
    }
  }
);

export const verifyUserBvn = createAsyncThunk(
  "bvn/verifyUserBvn",
  async (payload: VerifyBVNPayload, { rejectWithValue }) => {
    try {
      const response = await verifyBVN(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response.data.message || "Failed to verify BVN"
      );
    }
  }
);

const bvnSlice = createSlice({
  name: "bvn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBvnStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBvnStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.bvnStatus = action.payload;
      })
      .addCase(fetchBvnStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyUserBvn.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUserBvn.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyRes = action.payload;
      })
      .addCase(verifyUserBvn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bvnSlice.reducer;
