import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCountries } from "./regionAPI"; // you'll create this API call next
import { Country } from "@/types/region";

interface RegionState {
  countries: Country[];
  loading: boolean;
  error: string | null;
  count: number;
}

const initialState: RegionState = {
  countries: [],
  loading: false,
  error: null,
  count: 0,
};

export const fetchCountries = createAsyncThunk(
  "country/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCountries();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch businesses"
      );
    }
  }
);

const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    clearRegionState: (state) => {
      state.countries = [];
      state.error = null;
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === "ok") {
          state.countries = action.payload.countries || [];
          state.count = action.payload.count || 0;
        } else {
          state.error = "Unexpected response format";
        }
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRegionState } = regionSlice.actions;
export default regionSlice.reducer;
