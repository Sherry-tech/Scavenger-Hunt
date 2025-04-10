// slices/huntApiSlice.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../services/baseQueryWithReauth'; // Import the shared baseQuery

export const huntApi = createApi({
 reducerPath: 'huntApi',
 baseQuery: baseQueryWithReauth, // Use the shared baseQuery
 tagTypes: ['Hunts'],
 endpoints: (builder) => ({
  getHunts: builder.query({
   query: ({ searchByName = '', page = 1, limit = 10 }) => ({
    url: '/dashboardhuntList',
    params: {
     searchByName,
     page,
     limit,
    },
   }),
   providesTags: [{ type: 'Hunts', id: 'LIST' }],
  }),
  createHunt: builder.mutation({
   query: (formData) => ({
    url: '/createHunt',
    method: 'POST',
    body: formData,
   }),
   invalidatesTags: [{ type: 'Hunts', id: 'LIST' }],
  }),

  deleteHunt: builder.mutation({
   query: (huntId) => ({
    url: `/deleteHunt`,
    method: 'DELETE',
    params: { huntId },
   }),
   invalidatesTags: [{ type: 'Hunts', id: 'LIST' }],
  }),

  getLocations: builder.query({
   query: () => '/huntLocationListDropdown',
   providesTags: [{ type: 'Locations', id: 'LIST' }],
  }),
  // Add other endpoints like updateHunt, deleteHunt, etc.
 }),
});

export const { useGetHuntsQuery, useCreateHuntMutation, useDeleteHuntMutation, useGetLocationsQuery } = huntApi;
