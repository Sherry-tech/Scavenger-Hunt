// components/auth/SuccessPopup.jsx
import React from 'react';
import {
 Dialog,
 DialogContent,
 DialogActions,
 Button,
 Typography,
 IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SuccessPopup = ({ open, onClose, onLogin }) => {
 return (
  <Dialog
   open={open}
   onClose={onClose}
   // Position the Dialog in the top center
   sx={{
    '& .MuiDialog-paper': {
     borderRadius: '8px',
     padding: '16px',
     maxWidth: '500px',
     width: '100%',
     position: 'absolute',
     top: '20%',
     left: '50%',
     transform: 'translate(-50%, -20%)',
    },
   }}
   // Add a shadowed background
   BackdropProps={{
    style: {
     backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
   }}
  >
   {/* Close Icon */}
   <IconButton
    aria-label="close"
    onClick={onClose}
    sx={{
     position: 'absolute',
     right: 8,
     top: 8,
     color: '#000',
    }}
   >
    <CloseIcon />
   </IconButton>

   <DialogContent
    sx={{
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     padding: 4,
     textAlign: 'center',
    }}
   >
    {/* Success Image */}
    <img
     src="/success.svg"
     alt="Success"
     style={{ width: '60px', height: '60px', marginBottom: '16px' }}
    />

    {/* Message */}
    <Typography
     sx={{
      fontFamily: 'Poppins, sans-serif',
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: 2,
      textAlign: 'center',
     }}
    >
     Password Changed Successfully!
    </Typography>
   </DialogContent>

   <DialogActions sx={{ justifyContent: 'center', paddingBottom: 3 }}>
    <Button
     variant="contained"
     onClick={onLogin}
     sx={{
      backgroundColor: '#000000',
      color: '#FFFFFF',
      fontFamily: 'Poppins, sans-serif',
      width: '224px',
      height: '46px',
      padding: '13px 32px',
      textTransform: 'none',
      '&:hover': { backgroundColor: '#333333' },
     }}
    >
     Login
    </Button>
   </DialogActions>
  </Dialog>
 );
};

export default SuccessPopup;
