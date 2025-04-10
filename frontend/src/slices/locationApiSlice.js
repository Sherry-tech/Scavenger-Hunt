// slices/locationApiSlice.js
import { createApi } from '@reduxjs/toolkit/query/react';


const baseUrl = 'http://52.72.52.84:4000/api'

// Mock base query to simulate API calls
const mockBaseQuery = async () => {
 // Simulate a delay
 await new Promise((resolve) => setTimeout(resolve, 500));

 // Return hardcoded location data
 return {
  data: [
   {
    id: 1,
    name: 'Central Park',
    address: 'New York, NY',
    status: 'Active',
    hunts: ['Hunt A', 'Hunt B'],
   },
   {
    id: 2,
    name: 'Golden Gate Bridge',
    address: 'San Francisco, CA',
    status: 'Inactive',
    hunts: ['Hunt C'],
   },
   {
    id: 3,
    name: 'Eiffel Tower',
    address: 'Paris, France',
    status: 'Active',
    hunts: ['Hunt D', 'Hunt E', 'Hunt F'],
   },
   // Add more mock locations as needed
  ],
 };
};

export const locationApi = createApi({
 reducerPath: 'locationApi',
 baseQuery: mockBaseQuery,
 endpoints: (builder) => ({
  getLocations: builder.query({
   query: () => '', // No endpoint needed since we're mocking
  }),
 }),
});

// Export hooks for usage in functional components
export const { useGetLocationsQuery } = locationApi;
