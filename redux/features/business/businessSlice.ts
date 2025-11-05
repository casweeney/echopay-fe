import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBusinesses } from "./businessAPI"; // you'll create this API call next
import { Business } from "@/types/business";

interface BusinessState {
  businesses: Business[];
  loading: boolean;
  error: string | null;
  count: number;
}

const initialState: BusinessState = {
  businesses: [],
  loading: false,
  error: null,
  count: 0,
};

// Fetch businesses data
export const fetchBusinesses = createAsyncThunk(
  "business/fetchBusinesses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBusinesses();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch businesses"
      );
    }
  }
);

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    clearBusinessState: (state) => {
      state.businesses = [];
      state.error = null;
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinesses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBusinesses.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === "ok") {
          state.businesses = action.payload.businesses || [];
          state.count = action.payload.count || 0;
        } else {
          state.error = "Unexpected response format";
        }
      })
      .addCase(fetchBusinesses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBusinessState } = businessSlice.actions;
export default businessSlice.reducer;
