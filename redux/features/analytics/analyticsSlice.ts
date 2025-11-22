import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAnalytics } from "./analyticsAPI";
import { BusinessAnalyticsResponse } from "@/types/analytics";

interface AnalyticsState {
  analytics: BusinessAnalyticsResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  analytics: null,
  loading: false,
  error: null,
};

export const fetchAnalytics = createAsyncThunk(
  "apiKey/fetchAnalytics",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getAnalytics(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export default analyticsSlice.reducer;
