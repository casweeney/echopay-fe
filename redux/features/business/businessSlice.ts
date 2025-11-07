import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBusinesses, getCurrentBusiness } from "./businessAPI"; // you'll create this API call next
import { Business, CurrentBusinessData } from "@/types/business";

interface BusinessState {
  business: CurrentBusinessData | null;
  businesses: Business[];
  loading: boolean;
  error: string | null;
  count: number;
}

const initialState: BusinessState = {
  business: null,
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

export const fetchCurrentBusiness = createAsyncThunk(
  "business/fetchCurrentBusiness",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentBusiness();
      console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch current business"
      );
    }
  }
);

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    clearBusinessState: (state) => {
      state.business = null;
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
      })
      .addCase(fetchCurrentBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.business = action.payload.data;
      })
      .addCase(fetchCurrentBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export const { clearBusinessState } = businessSlice.actions;
export default businessSlice.reducer;
