// slices/authApiSlice.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../services/baseQueryWithReauth'; // Import the shared baseQuery

export const authApi = createApi({
 reducerPath: 'authApi',
 baseQuery: baseQueryWithReauth, // Use the shared baseQuery
 endpoints: (builder) => ({
  // Existing login mutation
  login: builder.mutation({
   query: ({ email, password }) => ({
    url: '/adminLogin',
    method: 'POST',
    body: { email, password },
   }),
  }),
  // New OTP request mutation
  requestOtp: builder.mutation({
   query: ({ email }) => ({
    url: '/getAdminOTP',
    method: 'POST',
    body: { email },
   }),
  }),
  // New OTP verification mutation
  verifyOtp: builder.mutation({
   query: ({ email, otp }) => ({
    url: '/verifyAdminOTP',
    method: 'POST',
    body: { email, otp },
   }),
  }),
  // New resetPassword mutation
  resetPassword: builder.mutation({
   query: ({ email, password }) => ({
    url: '/resetAdminPassword',
    method: 'POST',
    body: { email, password },
   }),
  }),
 }),
});

// Export the auto-generated hooks for the endpoints
export const {
 useLoginMutation,
 useRequestOtpMutation,
 useVerifyOtpMutation,
 useResetPasswordMutation,
} = authApi;
