// components/Loader.jsx
import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = ({ height = '100%', overlay = false }) => {
 const loaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: height,
  width: '100%',
 };

 if (overlay) {
  loaderStyle.position = 'absolute';
  loaderStyle.top = 0;
  loaderStyle.left = 0;
  loaderStyle.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Semi-transparent overlay
  loaderStyle.zIndex = 1000;
 }

 return (
  <Box sx={loaderStyle}>
   <CircularProgress sx={{ color: 'black' }} />
  </Box>
 );
};

export default Loader;
