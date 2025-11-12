import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBusinessCategories,
  getBusinessDetails,
  getBusinesses,
  getBusinessVerificationStatus,
  getCurrentBusiness,
  switchCurrentBusiness,
  verifyUserBusiness,
} from "./businessAPI";
import {
  Business,
  BusinessCategory,
  BusinessDetails,
  BusinessVerificationStatusResponse,
  CurrentBusinessData,
  VerifyBusinessPayload,
  VerifyBusinessResponse,
} from "@/types/business";

interface BusinessState {
  businessDetails: BusinessDetails | null;
  business: CurrentBusinessData | null;
  businesses: Business[];
  businessCategories: BusinessCategory[];
  verifyData: VerifyBusinessResponse | null;
  verificationStatus: BusinessVerificationStatusResponse | null;
  loading: boolean;
  error: string | null;
  count: number;
  message: string;
}

const initialState: BusinessState = {
  businessDetails: null,
  business: null,
  businesses: [],
  businessCategories: [],
  verifyData: null,
  verificationStatus: null,
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
      // console.log(response);
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
      // console.log(response);
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
      // console.log(response);
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
      // console.log(response.business_categories);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch business categories"
      );
    }
  }
);

export const verifyBusiness = createAsyncThunk(
  "business/verifyBusiness",
  async (
    { id, payload }: { id: string; payload: VerifyBusinessPayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await verifyUserBusiness(id, payload);
      // console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to verify business"
      );
    }
  }
);

export const fetchBusinessVerificationStatus = createAsyncThunk(
  "business/fetchBusinessVerificationStatus",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getBusinessVerificationStatus(id);
      // console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch business verification status"
      );
    }
  }
);

export const fetchBusinessDetails = createAsyncThunk(
  "business/fetchBusinessDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getBusinessDetails(id);
      // console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch business details"
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
      })
      .addCase(verifyBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyData = action.payload;
      })
      .addCase(verifyBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBusinessVerificationStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBusinessVerificationStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationStatus = action.payload;
      })
      .addCase(fetchBusinessVerificationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBusinessDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBusinessDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.businessDetails = action.payload.data;
      })
      .addCase(fetchBusinessDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBusinessState } = businessSlice.actions;
export default businessSlice.reducer;
