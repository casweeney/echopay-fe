import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBusinessCategories,
  getBusinesses,
  getCurrentBusiness,
  switchCurrentBusiness,
} from "./businessAPI";
import {
  Business,
  BusinessCategory,
  CurrentBusinessData,
} from "@/types/business";

interface BusinessState {
  business: CurrentBusinessData | null;
  businesses: Business[];
  businessCategories: BusinessCategory[];
  loading: boolean;
  error: string | null;
  count: number;
  message: string;
}

const initialState: BusinessState = {
  business: null,
  businesses: [],
  businessCategories: [],
  loading: false,
  error: null,
  count: 0,
  message: "",
};

// Fetch businesses data
export const fetchBusinesses = createAsyncThunk(
  "business/fetchBusinesses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBusinesses();
      console.log(response);
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

export const switchBusiness = createAsyncThunk(
  "business/switchCurrentBusiness",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await switchCurrentBusiness(id);
      console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to switch current business"
      );
    }
  }
);

export const fetchBusinessCategories = createAsyncThunk(
  "business/fetchBusinessCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBusinessCategories();
      console.log(response.business_categories);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch business categories"
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
      })
      .addCase(switchBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(switchBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(switchBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBusinessCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBusinessCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.businessCategories = action.payload.business_categories || [];
      })
      .addCase(fetchBusinessCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBusinessState } = businessSlice.actions;
export default businessSlice.reducer;
