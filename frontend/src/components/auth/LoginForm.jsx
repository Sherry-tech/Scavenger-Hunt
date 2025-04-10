// LoginForm.jsx

import React, { useState } from 'react';
import { TextField, Button, Checkbox } from "@mui/material";

const LoginForm = ({ onSubmit, onForgotPassword }) => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const [rememberMe, setRememberMe] = useState(false);

 const [emailError, setEmailError] = useState('');
 const [passwordError, setPasswordError] = useState('');

 const handleSubmit = (event) => {
  event.preventDefault();

  // Validate email and password
  let valid = true;
  let emailErrorMsg = '';
  let passwordErrorMsg = '';

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
   emailErrorMsg = 'Email is required';
   valid = false;
  } else if (!emailRegex.test(email)) {
   emailErrorMsg = 'Please enter a valid email address';
   valid = false;
  }

  // Password validation
  if (!password) {
   passwordErrorMsg = 'Password is required';
   valid = false;
  }

  setEmailError(emailErrorMsg);
  setPasswordError(passwordErrorMsg);

  if (valid) {
   onSubmit(email, password);
  }
 };

 return (
  <form className="w-full max-w-md px-4" onSubmit={handleSubmit}>
   <h3 className="font-poppins text-[24px] font-bold leading-[36px] text-left mb-8">
    Log In
   </h3>
   <TextField
    className="mb-4"
    placeholder="Email address"
    variant="outlined"
    fullWidth
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    error={!!emailError}
    helperText={emailError}
    sx={{
     "& fieldset": {
      borderColor: emailError ? "red" : "#e0e0dd",
     },
     "& .MuiInputBase-root": {
      height: "47px",
      backgroundColor: "#fff",
      borderRadius: "6px",
      fontSize: "14px",
      fontFamily: "Poppins",
     },
     "& .MuiInputBase-input": { color: "#707070" },
    }}
   />
   <TextField
    className="mb-4"
    placeholder="Password"
    variant="outlined"
    type="password"
    fullWidth
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    error={!!passwordError}
    helperText={passwordError}
    InputProps={{
     endAdornment: (
      <img
       width="19.1px"
       height="18px"
       src="/brand-icon.svg"
       alt="Icon"
      />
     ),
    }}
    sx={{
     "& fieldset": {
      borderColor: passwordError ? "red" : "#e0e0dd",

     },
     "& .MuiInputBase-root": {
      height: "47px",
      backgroundColor: "#fff",
      paddingRight: "13.7px",
      borderRadius: "6px",
      fontSize: "14px",
      fontFamily: "Poppins",
     },
     "& .MuiInputBase-input": { color: "rgba(51, 51, 51, 0.7)" },
    }}
   />
   <div className="flex items-center justify-between mb-4">
    <div className="flex items-center">
     <Checkbox
      checked={rememberMe}
      onChange={(e) => setRememberMe(e.target.checked)}
      sx={{
       color: '#000',
       '&.Mui-checked': {
        color: '#000',
       },
      }}
     />
     <span className="text-sm tracking-[0.1px] font-poppins text-dimgray-200">
      Remember Me
     </span>
    </div>
    <div>
     <button
      type="button"
      onClick={onForgotPassword}
      className="text-xs underline cursor-pointer font-poppins text-dimgray-300"
     >
      Forget password.
     </button>
    </div>
   </div>
   <Button
    type="submit"
    className="w-full"
    disableElevation
    variant="contained"
    sx={{
     textTransform: "none",
     color: "#fafafb",
     fontSize: "14px",
     background: "#333",
     borderRadius: "6px",
     "&:hover": { background: "#333" },
     fontFamily: "Poppins",
     height: 47,
    }}
   >
    Login
   </Button>
  </form>
 );
};

export default LoginForm;
