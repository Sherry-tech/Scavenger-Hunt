// services/baseQueryWithReauth.js
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../slices/authSlice';

const baseUrl = 'http://52.72.52.84:4000/api';

const baseQuery = fetchBaseQuery({
 baseUrl,
 prepareHeaders: (headers, { getState }) => {
  // Get the token from state or localStorage
  const token = getState().auth.token || localStorage.getItem('token');
  if (token) {
   headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
 },
});

// Custom baseQuery with re-authentication logic
export const baseQueryWithReauth = async (args, api, extraOptions) => {
 let result = await baseQuery(args, api, extraOptions);

 if (result.error && result.error.status === 401) {
  // Token has expired, dispatch logout action
  api.dispatch(logout());
 }

 return result;
};
