import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  verifyUserEmail,
  resendUserEmailVerification,
} from "./authAPI";
import {
  RegisterPayload,
  User,
  LoginPayload,
  VerifyEmailPayload,
  ResendVerificationPayload,
} from "@/types/auth";
import { setAuthToken, clearAuthToken, getAuthToken } from "@/utils/token";
import { persistor } from "@/redux/store";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: getAuthToken(),
  loading: false,
  error: null,
  message: null,
  isAuthenticated: !!getAuthToken(),
};

// Register Thunk
export const register = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await registerUser(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Login Thunk
export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await loginUser(payload);
      setAuthToken(response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Email Verification Thunk
export const verifyEmail = createAsyncThunk(
  "auth/verify-email",
  async (payload: VerifyEmailPayload, { rejectWithValue }) => {
    try {
      const response = await verifyUserEmail(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Email verification failed"
      );
    }
  }
);

// Resend Email Verification Thunk
export const resendEmailVerification = createAsyncThunk(
  "auth/resend-verification",
  async (payload: ResendVerificationPayload, { rejectWithValue }) => {
    try {
      const response = await resendUserEmailVerification(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Resend email verification failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      clearAuthToken();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("persist:root");
    },
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.message = "Login successful";
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //Resend Email Verification
      .addCase(resendEmailVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendEmailVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(resendEmailVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
