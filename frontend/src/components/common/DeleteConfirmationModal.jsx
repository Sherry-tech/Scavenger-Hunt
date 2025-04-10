// components/common/DeleteConfirmationModal.jsx
import React from 'react';
import {
 Dialog,
 DialogContent,
 DialogActions,
 Button,
 Typography,
 Box,
} from '@mui/material';

const DeleteConfirmationModal = ({ open, onClose, onConfirmDelete, message }) => {
 return (
  <Dialog open={open} onClose={onClose}>
   <DialogContent
    sx={{
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     padding: 4,
    }}
   >
    {/* Replaced the icon with an image from the public folder */}
    <img src="/warning.svg" alt="Warning" style={{ width: '60px', height: '60px' }} />

    {/* Removed the title as per your request */}

    {/* Message */}
    <Typography
     sx={{
      fontFamily: 'Poppins, sans-serif',
      fontSize: '16px',
      marginTop: 2,
      textAlign: 'center',
     }}
    >
     {message || 'Are you sure you want to delete this item?'}
    </Typography>
   </DialogContent>
   <DialogActions sx={{ justifyContent: 'center', paddingBottom: 3 }}>
    <Button
     variant="contained"
     onClick={onClose}
     sx={{
      backgroundColor: '#E0E0E0',
      color: 'black',
      fontFamily: 'Poppins, sans-serif',
      width: '224px',
      height: '46px',
      padding: '13px 32px',
      '&:hover': { backgroundColor: '#D6D6D6' },
     }}
    >
     No
    </Button>
    <Button
     variant="contained"
     onClick={onConfirmDelete}
     sx={{
      backgroundColor: '#000000',
      color: '#FFFFFF',
      fontFamily: 'Poppins, sans-serif',
      width: '224px',
      height: '46px',
      padding: '13px 32px',
      '&:hover': { backgroundColor: '#333333' },
     }}
    >
     Yes
    </Button>
   </DialogActions>
  </Dialog>
 );
};

export default DeleteConfirmationModal;
