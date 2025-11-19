import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createApiKey, getApiKeys, deleteApiKey } from "./apiKeyAPI";
import { CreateKeyPayload, ApiKey, CreateKeyData } from "@/types/apiKey";

interface ApiKeysState {
  keys: ApiKey[];
  key: CreateKeyData | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: ApiKeysState = {
  keys: [],
  key: null,
  loading: false,
  error: null,
  success: null,
};

export const createKey = createAsyncThunk(
  "apiKey/create",
  async (payload: CreateKeyPayload, { rejectWithValue }) => {
    try {
      const response = await createApiKey(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

export const fetchApiKeys = createAsyncThunk(
  "apiKey/fetchApiKeys",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getApiKeys(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

export const deleteKey = createAsyncThunk(
  "apiKey/deleteApiKey",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteApiKey(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

const apiKeysSlice = createSlice({
  name: "apiKeys",
  initialState,
  reducers: {
    resetStatus(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Key
    builder
      .addCase(createKey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createKey.fulfilled, (state, action) => {
        state.loading = false;
        state.key = action.payload;
      })
      .addCase(createKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      // Get Keys
      .addCase(fetchApiKeys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiKeys.fulfilled, (state, action) => {
        state.loading = false;
        state.keys = action.payload.api_keys || [];
      })
      .addCase(fetchApiKeys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Key
      .addCase(deleteKey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteKey.fulfilled, (state, action) => {
        state.loading = false;
        state.keys = state.keys.filter((key) => key.id !== action.payload);
        state.success = "API key deleted successfully!";
      })
      .addCase(deleteKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStatus } = apiKeysSlice.actions;
export default apiKeysSlice.reducer;
