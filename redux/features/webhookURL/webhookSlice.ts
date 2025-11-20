import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createWebhookURL, getWebhookURL } from "./webhookAPI";
import {
  CreateWebhookUrlPayload,
  CreateWebhookUrlResponse,
  Webhook,
} from "@/types/webhook";

interface WebhookState {
  fetchedData: Webhook | null;
  data: CreateWebhookUrlResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: WebhookState = {
  fetchedData: null,
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
      return rejectWithValue(error?.response.data.errors.url[0]);
    }
  }
);

export const fetchURL = createAsyncThunk(
  "webhookURL/fetch",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getWebhookURL(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
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
      })
      .addCase(fetchURL.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchURL.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedData = action.payload.data;
      })
      .addCase(fetchURL.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetWebhookState } = webhookSlice.actions;
export default webhookSlice.reducer;
