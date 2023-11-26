import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserSessionId } from "../../../api/auth/auth.service";

export const createSession = createAsyncThunk(
  "user/createSession",
  async () => {
    try {
      const data = await getUserSessionId();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  isLoggedIn: false,
  userName: localStorage.getItem("user"),
  sessionId: sessionStorage.getItem("Session-ID"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userName = action.payload.toLowerCase();
      localStorage.setItem("user", action.payload);
    },
    logout: (state, action) => {
      state.sessionId = "";
      state.isLoggedIn = false;
      sessionStorage.removeItem("Session-ID")
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createSession.pending, (state, action) => {
      state.isLoggedIn = true;
    }),
      builder.addCase(createSession.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.sessionId = action.payload;
        sessionStorage.setItem("Session-ID", action.payload);
      }),
      builder.addCase(createSession.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
