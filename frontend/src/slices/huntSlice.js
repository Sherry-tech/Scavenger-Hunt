import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 hunts: [],
 isLoading: false,
 error: null,
};

const huntSlice = createSlice({
 name: 'hunt',
 initialState,
 reducers: {
  setHunts(state, action) {
   state.hunts = action.payload;
  },
  fetchHuntsStart(state) {
   state.isLoading = true;
   state.error = null;
  },
  fetchHuntsSuccess(state, action) {
   state.isLoading = false;
   state.hunts = action.payload;
  },
  fetchHuntsFailure(state, action) {
   state.isLoading = false;
   state.error = action.payload;
  },
 },
});

export const {
 setHunts,
 fetchHuntsStart,
 fetchHuntsSuccess,
 fetchHuntsFailure,
} = huntSlice.actions;

export default huntSlice.reducer;
