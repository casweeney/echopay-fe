import { DisbursementPayload, DisbursementRequest } from "@/types/disbursement";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createDisbursement } from "./disbursementAPI";

export interface DisbursementState {
  disbursement: any;
  loading: boolean;
  error: string | null;
}

export const initialDisbursementState: DisbursementState = {
  disbursement: null,
  loading: false,
  error: null,
};

export const initiateDisbursement = createAsyncThunk(
  "disbursement/initiateDisbursement",
  async (payload: DisbursementRequest, { rejectWithValue }) => {
    try {
      const response = await createDisbursement(payload);
      console.log(response);
      return response;
    } catch (error: any) {
      console.log("API ERROR:", error);
      return rejectWithValue(
        error.response?.data || "Failed to initiate disbursement"
      );
    }
  }
);

const disbursementSlice = createSlice({
  name: "disbursement",
  initialState: initialDisbursementState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiateDisbursement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiateDisbursement.fulfilled, (state, action) => {
        state.loading = false;
        state.disbursement = action.payload;
      })
      .addCase(initiateDisbursement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default disbursementSlice.reducer;
