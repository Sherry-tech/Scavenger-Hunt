// OtpVerificationForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField } from '@mui/material';

const OtpVerificationForm = ({
 email,
 onSubmit,
 otp,
 setOtp,
 resendTimer,
 onResendCode,
 isLoading,
 error,
}) => {
 const [otpError, setOtpError] = useState('');
 const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

 useEffect(() => {
  if (otp.length < 4) {
   // Set focus on the first empty input
   const firstEmptyIndex = otp.length;
   otpRefs[firstEmptyIndex]?.current?.focus();
  }
 }, [otp]);

 const handleSubmit = (event) => {
  event.preventDefault();

  // Validate OTP
  let valid = true;
  let otpErrorMsg = '';

  if (!otp || otp.length !== 4) {
   otpErrorMsg = 'Please enter the 4-digit code';
   valid = false;
  }

  setOtpError(otpErrorMsg);

  if (valid) {
   onSubmit(otp);
  }
 };

 const handleOtpChange = (e, index) => {
  const val = e.target.value.replace(/[^0-9]/g, '');
  if (val.length > 1) return;
  let newOtp = otp.split('');
  newOtp[index] = val;
  setOtp(newOtp.join(''));
  // Move focus to next input
  if (val && index < 3) {
   otpRefs[index + 1]?.current?.focus();
  }
 };

 const handleKeyDown = (e, index) => {
  if (e.key === 'Backspace' && !otp[index] && index > 0) {
   otpRefs[index - 1]?.current?.focus();
  }
 };

 const handleResendCode = () => {
  onResendCode();
 };

 return (
  <form className="w-full max-w-md px-4" onSubmit={handleSubmit}>
   <h3 className="font-poppins text-[24px] font-bold leading-[36px] text-left mb-4">
    Check Your Email
   </h3>
   <p className="text-left mb-8">We sent a code to {email}</p>
   {/* OTP Input Fields */}
   <div className="flex justify-between mb-4">
    {[0, 1, 2, 3].map((index) => (
     <TextField
      key={index}
      id={`otp-${index}`}
      inputRef={otpRefs[index]}
      variant="outlined"
      inputProps={{
       maxLength: 1,
       style: { textAlign: 'center', fontSize: '24px' },
      }}
      value={otp[index] || ''}
      onChange={(e) => handleOtpChange(e, index)}
      onKeyDown={(e) => handleKeyDown(e, index)}
      sx={{
       '& .MuiInputBase-root': {
        width: '60px',
        height: '60px',
        backgroundColor: '#fff',
        borderRadius: '6px',
        fontSize: '24px',
       },
      }}
      error={!!otpError || !!error}
     />
    ))}
   </div>
   {/* Display validation or API error */}
   {(otpError || error) && (
    <div className="text-red-600 text-sm mb-4">{otpError || error}</div>
   )}
   {/* Resend Code */}
   <div className="flex justify-between items-center mb-4">
    <button
     type="button"
     onClick={handleResendCode}
     className="text-xs underline text-c-07"
     disabled={resendTimer > 0}
    >
     Resend Code
    </button>
    <span className="text-xs">
     {resendTimer > 0 ? `00:${resendTimer < 10 ? '0' : ''}${resendTimer}` : ''}
    </span>
   </div>
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
    {isLoading ? 'Verifying...' : 'Verify Email'}
   </Button>
  </form>
 );
};

export default OtpVerificationForm;
