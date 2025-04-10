// CreateNewPasswordForm.jsx
import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CreateNewPasswordForm = ({ onSubmit, isLoading, error }) => {
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [showPassword1, setShowPassword1] = useState(false);
 const [showPassword2, setShowPassword2] = useState(false);

 const [passwordError, setPasswordError] = useState('');
 const [confirmPasswordError, setConfirmPasswordError] = useState('');

 const handleSubmit = (event) => {
  event.preventDefault();

  // Validate passwords
  let valid = true;
  let passwordErrorMsg = '';
  let confirmPasswordErrorMsg = '';

  if (!password) {
   passwordErrorMsg = 'Password is required';
   valid = false;
  } else if (password.length < 6) {
   passwordErrorMsg = 'Password must be at least 6 characters';
   valid = false;
  }

  if (!confirmPassword) {
   confirmPasswordErrorMsg = 'Please confirm your password';
   valid = false;
  } else if (password !== confirmPassword) {
   confirmPasswordErrorMsg = 'Passwords do not match';
   valid = false;
  }

  setPasswordError(passwordErrorMsg);
  setConfirmPasswordError(confirmPasswordErrorMsg);

  if (valid) {
   onSubmit(password);
  }
 };

 return (
  <form className="w-full max-w-md px-4" onSubmit={handleSubmit}>
   <h3 className="font-poppins text-[24px] font-bold leading-[36px] text-left mb-8">
    Create New Password
   </h3>
   <TextField
    className="mb-4"
    placeholder="Password"
    variant="outlined"
    type={showPassword1 ? 'text' : 'password'}
    fullWidth
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    error={!!passwordError}
    helperText={passwordError}
    InputProps={{
     endAdornment: (
      <InputAdornment position="end">
       <IconButton onClick={() => setShowPassword1(!showPassword1)} edge="end">
        {showPassword1 ? <VisibilityOff /> : <Visibility />}
       </IconButton>
      </InputAdornment>
     ),
    }}
    sx={{
     '& fieldset': {
      borderColor: passwordError ? 'red' : '#e0e0dd',
     },
     '& .MuiInputBase-root': {
      height: '47px',
      backgroundColor: '#fff',
      borderRadius: '6px',
      fontSize: '14px',
     },
     '& .MuiInputBase-input': { color: '#333' },
    }}
   />
   <TextField
    className="mb-4"
    placeholder="Confirm Password"
    variant="outlined"
    type={showPassword2 ? 'text' : 'password'}
    fullWidth
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    error={!!confirmPasswordError}
    helperText={confirmPasswordError}
    InputProps={{
     endAdornment: (
      <InputAdornment position="end">
       <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
        {showPassword2 ? <VisibilityOff /> : <Visibility />}
       </IconButton>
      </InputAdornment>
     ),
    }}
    sx={{
     '& fieldset': {
      borderColor: confirmPasswordError ? 'red' : '#e0e0dd',
     },
     '& .MuiInputBase-root': {
      height: '47px',
      backgroundColor: '#fff',
      borderRadius: '6px',
      fontSize: '14px',
     },
     '& .MuiInputBase-input': { color: '#333' },
    }}
   />
   {/* Display API error if present */}
   {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
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
    {isLoading ? 'Resetting...' : 'Reset Password'}
   </Button>
  </form>
 );
};

export default CreateNewPasswordForm;
