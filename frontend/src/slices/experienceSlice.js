import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 experiences: [
  {
   title: 'City Explorer Challenge',
   description: 'Explore Downtown...',
   type: 'AR',
   status: 'Active',
   hunts: ["Burr's Hill", 'Royal Pokan'],
  },
  {
   title: 'Escape The Maze',
   description: 'Find Your Way Out',
   type: 'Puzzle',
   status: 'Inactive',
   hunts: ["Burr's Hill", 'Royal Pokan'],
  },
  {
   title: 'The Hidden Artifact',
   description: 'Enter The Virtual Jungle',
   type: 'Text',
   status: 'Inactive',
   hunts: ["Burr's Hill", 'Royal Pokan'],
  },
  {
   title: 'City Explorer Challenge',
   description: 'Explore Downtown',
   type: 'AR',
   status: 'Active',
   hunts: ["Burr's Hill", 'Royal Pokan'],
  },
  {
   title: 'Escape The Maze',
   description: 'Find Your Way Out',
   type: 'Puzzle',
   status: 'Inactive',
   hunts: ["Burr's Hill", 'Royal Pokan'],
  },
  {
   title: 'The Hidden Artifact',
   description: 'Enter The Virtual Jungle',
   type: 'Text',
   status: 'Inactive',
   hunts: ["Burr's Hill", 'Royal Pokan'],
  },
  {
   title: 'City Explorer Challenge',
   description: 'Explore Downtown',
   type: 'AR',
   status: 'Active',
   hunts: ["Burr's Hill", 'Royal Pokan'],
  },
  {
   title: 'Escape The Maze',
   description: 'Find Your Way Out',
   type: 'Puzzle',
   status: 'Inactive',
   hunts: ["Burr's Hill", 'Royal Pokan'],
  },
  {
   title: 'The Hidden Artifact',
   description: 'Enter The Virtual Jungle',
   type: 'Text',
   status: 'Inactive',
   hunts: ["Burr's Hill", 'Royal Pokan'],
  },
  {
   title: 'City Explorer Challenge',
   description: 'Explore Downtown',
   type: 'AR',
   status: 'Active',
   hunts: ["Burr's Hill", 'Royal Pokan'],
  },
  {
   title: 'Escape The Maze',
   description: 'Find Your Way Out',
   type: 'Puzzle',
   status: 'Inactive',
   hunts: ["Burr's Hill", 'Royal Pokan'],
  },
  {
   title: 'The Hidden Artifact',
   description: 'Enter The Virtual Jungle',
   type: 'Text',
   status: 'Inactive',
   hunts: ["Burr's Hill", 'Royal Pokan'],
  },
 ],
 isLoading: false,
 error: null,
};

const experienceSlice = createSlice({
 name: 'experience',
 initialState,
 reducers: {
  // You can define reducers here if needed
  setExperiences(state, action) {
   state.experiences = action.payload;
  },
  fetchExperiencesStart(state) {
   state.isLoading = true;
   state.error = null;
  },
  fetchExperiencesSuccess(state, action) {
   state.isLoading = false;
   state.experiences = action.payload;
  },
  fetchExperiencesFailure(state, action) {
   state.isLoading = false;
   state.error = action.payload;
  },
 },
});

export const {
 setExperiences,
 fetchExperiencesStart,
 fetchExperiencesSuccess,
 fetchExperiencesFailure,
} = experienceSlice.actions;

export default experienceSlice.reducer;
