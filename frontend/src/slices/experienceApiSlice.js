// slices/experienceApiSlice.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../services/baseQueryWithReauth'; // Import the shared baseQuery

export const experienceApi = createApi({
   reducerPath: 'experienceApi',
   baseQuery: baseQueryWithReauth, // Use the shared baseQuery
   tagTypes: ['Experiences', 'Locations'],
   endpoints: (builder) => ({
      getExperiences: builder.query({
         query: ({ searchByName = '', page = 1, limit = 10 }) => ({
            url: '/experienceList',
            params: {
               searchByName,
               page,
               limit,
            },
         }),
         providesTags: (result) =>
            result
               ? [
                  ...result.data.map(({ id }) => ({ type: 'Experiences', id })),
                  { type: 'Experiences', id: 'LIST' },
               ]
               : [{ type: 'Experiences', id: 'LIST' }],
      }),

      getExperienceLocationsDropDown: builder.query({
         query: () => ({
            url: '/experienceLocationsDropDown',
            method: 'GET',
         }),
         providesTags: (result) =>
            result
               ? [{ type: 'Locations', id: 'DROPDOWN' }]
               : [{ type: 'Locations', id: 'DROPDOWN' }],
      }),

      addExperience: builder.mutation({
         query: (formData) => ({
            url: '/addExperience',
            method: 'POST',
            body: formData,
         }),
         invalidatesTags: [{ type: 'Experiences', id: 'LIST' }],
      }),

      editExperience: builder.mutation({
         query: (formData) => ({
            url: '/editExperience',
            method: 'POST',
            body: formData,
         }),
         invalidatesTags: [{ type: 'Experiences', id: 'LIST' }],
      }),

      deleteExperience: builder.mutation({
         query: (experienceId) => ({
            url: `/deleteExperience?experienceId=${experienceId}`,
            method: 'DELETE',
         }),
         invalidatesTags: [{ type: 'Experiences', id: 'LIST' }],
      }),
   }),
});

export const {
   useGetExperiencesQuery,
   useGetExperienceLocationsDropDownQuery,
   useAddExperienceMutation,
   useEditExperienceMutation,
   useDeleteExperienceMutation,
} = experienceApi;
