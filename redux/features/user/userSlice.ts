import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "./userAPI";
import { GetUserResponse, User } from "@/types/user";

interface UserState {
  user: GetUserResponse | null;
  loading: boolean;
  error: string | null;
  isVerified: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isVerified: false,
};

// Fetch user data
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();
      console.log("Fetched user response:", response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.error = null;
      state.isVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;

        // Handle verify-redirect logic
        if (
          action.payload.status === "error" &&
          action.payload.message === "Please verify your email address first"
        ) {
          state.error = "Please verify your email address first";
          state.isVerified = false;
        } else {
          state.user = action.payload || null;
          state.isVerified = !!action.payload.data?.user?.email_verified_at;
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
