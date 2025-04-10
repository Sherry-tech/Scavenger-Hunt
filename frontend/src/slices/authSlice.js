// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 view: 'login',
 email: '',
 otp: '',
 resendTimer: 20,
 isAuthenticated: !!localStorage.getItem('token'),
 user: null,
 token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
 name: 'auth',
 initialState,
 reducers: {
  setView(state, action) {
   state.view = action.payload;
  },
  setEmail(state, action) {
   state.email = action.payload;
  },
  setOtp(state, action) {
   state.otp = action.payload;
  },
  setResendTimer(state, action) {
   state.resendTimer = action.payload;
  },
  decrementResendTimer(state) {
   state.resendTimer -= 1;
  },
  resetResendTimer(state, action) {
   state.resendTimer = action.payload;
  },
  setAuthenticated(state, action) {
   state.isAuthenticated = action.payload;
  },
  setUser(state, action) {
   state.user = action.payload;
  },
  setToken(state, action) {
   state.token = action.payload;
   localStorage.setItem('token', action.payload);
  },
  logout(state) {
   state.isAuthenticated = false;
   state.user = null;
   state.token = null;
   localStorage.removeItem('token');
  },
 },
});

export const {
 setView,
 setEmail,
 setOtp,
 setResendTimer,
 decrementResendTimer,
 resetResendTimer,
 setAuthenticated,
 setUser,
 setToken,
 logout,
} = authSlice.actions;

export default authSlice.reducer;
