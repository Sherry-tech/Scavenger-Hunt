// slices/clueApiSlice.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../services/baseQueryWithReauth'; // Import the shared baseQuery

export const clueApi = createApi({
   reducerPath: 'clueApi',
   baseQuery: baseQueryWithReauth, // Use the shared baseQuery
   tagTypes: ['Clues'],
   endpoints: (builder) => ({
      getClues: builder.query({
         query: ({ searchName = '', page = 1, limit = 10 }) => ({
            url: '/cluesList',
            params: {
               searchName,
               page,
               limit,
            },
         }),
         providesTags: (result) =>
            result
               ? [
                  ...result.data.result.map(({ id }) => ({ type: 'Clues', id })),
                  { type: 'Clues', id: 'LIST' },
               ]
               : [{ type: 'Clues', id: 'LIST' }],
      }),
      addClue: builder.mutation({
         query: (clueData) => ({
            url: '/addClue',
            method: 'POST',
            body: clueData,
         }),
         invalidatesTags: [{ type: 'Clues', id: 'LIST' }],
      }),
      updateClue: builder.mutation({
         query: (clueData) => ({
            url: '/editClue',
            method: 'PATCH',
            body: clueData,
         }),
         invalidatesTags: (result, error, { id }) => [{ type: 'Clues', id }],
      }),
      getClueLocations: builder.query({
         query: () => ({
            url: '/clueLocationsDropDown',
         }),
      }),
   }),
});

export const {
   useGetCluesQuery,
   useAddClueMutation,
   useUpdateClueMutation,
   useGetClueLocationsQuery,
} = clueApi;
