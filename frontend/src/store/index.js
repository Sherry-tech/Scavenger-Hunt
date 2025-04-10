import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import huntReducer from '../slices/huntSlice';
import experienceReducer from '../slices/experienceSlice';
import { experienceApi } from '../slices/experienceApiSlice';
import { locationApi } from '../slices/locationApiSlice';
import { authApi } from '../slices/authApiSlice';
import { huntApi } from '../slices/huntApiSlice';
import { clueApi } from '../slices/clueApiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    hunt: huntReducer,
    // experience: experienceReducer,
    [experienceApi.reducerPath]: experienceApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [huntApi.reducerPath]: huntApi.reducer,
    [clueApi.reducerPath]: clueApi.reducer,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(experienceApi.middleware, locationApi.middleware, authApi.middleware, huntApi.middleware, clueApi.middleware),
});

export default store;
