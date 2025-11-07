import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createWebhookURL } from "./webhookAPI";
import {
  CreateWebhookUrlPayload,
  CreateWebhookUrlResponse,
} from "@/types/webhook";

interface WebhookState {
  data: CreateWebhookUrlResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: WebhookState = {
  data: null,
  loading: false,
  error: null,
};

export const createURL = createAsyncThunk(
  "webhookURL/create",
  async (payload: CreateWebhookUrlPayload, { rejectWithValue }) => {
    try {
      const response = await createWebhookURL(payload);
      console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Key Creation failed"
      );
    }
  }
);

const webhookSlice = createSlice({
  name: "webhook",
  initialState,
  reducers: {
    resetWebhookState: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Key
    builder
      .addCase(createURL.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createURL.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createURL.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export const { resetWebhookState } = webhookSlice.actions;
export default webhookSlice.reducer;
