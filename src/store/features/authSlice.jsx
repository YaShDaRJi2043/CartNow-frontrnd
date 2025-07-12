import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  admin: null,
  userToken: null,
  adminToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    userLogin: (state, action) => {
      state.user = action.payload.user;
      state.userToken = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    userLogout: (state) => {
      state.user = null;
      state.userToken = null;
      state.loading = false;
      state.error = null;
    },
    adminLogin: (state, action) => {
      state.admin = action.payload.admin;
      state.adminToken = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    adminLogout: (state) => {
      state.admin = null;
      state.adminToken = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  userLogin,
  userLogout,
  adminLogin,
  adminLogout,
} = authSlice.actions;

export default authSlice.reducer;
