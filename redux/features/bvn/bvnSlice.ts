import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBvnStatus } from "./bvnAPI";
import { BVNVStatusResponse } from "@/types/bvn";

interface BvnStatusState {
  bvnStatus: BVNVStatusResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: BvnStatusState = {
  bvnStatus: null,
  loading: false,
  error: null,
};

// Fetch BVN status
export const fetchBvnStatus = createAsyncThunk(
  "bvn/fetchBvnStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBvnStatus();
      console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to BVN status");
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
      });
  },
});

export default bvnSlice.reducer;
