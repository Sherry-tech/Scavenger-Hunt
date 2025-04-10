// ForgotPasswordForm.jsx
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const ForgotPasswordForm = ({ onSubmit, email, setEmail, isLoading, error }) => {
 const [emailError, setEmailError] = useState('');

 const handleSubmit = (event) => {
  event.preventDefault();

  // Validate email
  let valid = true;
  let emailErrorMsg = '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
   emailErrorMsg = 'Email is required';
   valid = false;
  } else if (!emailRegex.test(email)) {
   emailErrorMsg = 'Please enter a valid email address';
   valid = false;
  }

  setEmailError(emailErrorMsg);

  if (valid) {
   onSubmit(email);
  }
 };

 return (
  <form className="w-full max-w-md px-4" onSubmit={handleSubmit}>
   <h3 className="font-poppins text-[24px] font-bold leading-[36px] text-left mb-4">
    Forgot Password
   </h3>
   <p className="text-left mb-8">
    Enter the email associated with your account and we’ll send instructions to reset your password.
   </p>
   <TextField
    className="mb-4"
    placeholder="Email address"
    variant="outlined"
    fullWidth
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    error={!!emailError || !!error}
    helperText={emailError || error}
    sx={{
     '& fieldset': {
      borderColor: emailError || error ? 'red' : '#e0e0dd',
     },
     '& .MuiInputBase-root': {
      height: '47px',
      backgroundColor: '#fff',
      borderRadius: '6px',
      fontSize: '14px',
     },
     '& .MuiInputBase-input': { color: '#707070' },
    }}
   />
   <Button
    type="submit"
    className="w-full"
    disableElevation
    variant="contained"
    disabled={isLoading}
    sx={{
     textTransform: 'none',
     color: '#fafafb',
     fontSize: '14px',
     background: '#333',
     borderRadius: '6px',
     '&:hover': { background: '#333' },
     height: 47,
    }}
   >
    {isLoading ? 'Sending...' : 'Verify Email'}
   </Button>
  </form>
 );
};

export default ForgotPasswordForm;
