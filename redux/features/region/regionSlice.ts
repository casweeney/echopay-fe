import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCountries, getStates } from "./regionAPI"; // you'll create this API call next
import { Country, State } from "@/types/region";

interface RegionState {
  countries: Country[];
  states: State[];
  loading: boolean;
  error: string | null;
  count: number;
}

const initialState: RegionState = {
  countries: [],
  states: [],
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
      return rejectWithValue(error?.response.data.message);
    }
  }
);

export const fetchStates = createAsyncThunk(
  "state/fetchStates",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getStates(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
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
      })
      .addCase(fetchStates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === "ok") {
          state.states = action.payload.states || [];
          state.count = action.payload.count || 0;
        } else {
          state.error = "Unexpected response format";
        }
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRegionState } = regionSlice.actions;
export default regionSlice.reducer;
