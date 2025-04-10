// pages/LogInPage.jsx
import React, { useEffect } from 'react';
import LoginForm from '../components/auth/LoginForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import OtpVerificationForm from '../components/auth/OtpVerificationForm';
import CreateNewPasswordForm from '../components/auth/CreateNewPasswordForm';
import SuccessPopup from '../components/auth/SuccessPopup';

import { useDispatch, useSelector } from 'react-redux';
import {
 setView,
 setEmail,
 setOtp,
 decrementResendTimer,
 resetResendTimer,
 setAuthenticated,
 setUser,
 setToken,
} from '../slices/authSlice';
import {
 useLoginMutation,
 useRequestOtpMutation,
 useVerifyOtpMutation,
 useResetPasswordMutation,
} from '../slices/authApiSlice';
import { useNavigate } from 'react-router-dom';

const LogInPage = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const { view, email, otp, resendTimer, isAuthenticated } = useSelector(
  (state) => state.auth
 );

 const [login, { data: loginData, isLoading: isLoginLoading, isError: isLoginError, error: loginError, isSuccess: isLoginSuccess }] =
  useLoginMutation();

 const [requestOtp, { isLoading: isRequestOtpLoading, isError: isRequestOtpError, error: requestOtpError, isSuccess: isRequestOtpSuccess }] =
  useRequestOtpMutation();

 const [verifyOtp, { isLoading: isVerifyOtpLoading, isError: isVerifyOtpError, error: verifyOtpError, isSuccess: isVerifyOtpSuccess }] =
  useVerifyOtpMutation();

 const [resetPassword, { isLoading: isResetPasswordLoading, isError: isResetPasswordError, error: resetPasswordError, isSuccess: isResetPasswordSuccess }] =
  useResetPasswordMutation();

 useEffect(() => {
  let timer;
  if (view === 'otpVerification' && resendTimer > 0) {
   timer = setInterval(() => {
    dispatch(decrementResendTimer());
   }, 1000);
  }
  return () => clearInterval(timer);
 }, [view, resendTimer, dispatch]);

 useEffect(() => {
  if (isAuthenticated) {
   navigate('/dashboard');
  }
 }, [isAuthenticated, navigate]);

 // Handle login success
 useEffect(() => {
  if (isLoginSuccess && loginData) {
   dispatch(setAuthenticated(true));
   dispatch(setUser(loginData.data)); // Adjust based on API response
   dispatch(setToken(loginData.data.accessToken)); // Save token in state
   localStorage.setItem('token', loginData.data.accessToken); // Store token in localStorage
   navigate('/dashboard');
  }
 }, [isLoginSuccess, loginData, dispatch, navigate]);

 // Handle OTP request success
 useEffect(() => {
  if (isRequestOtpSuccess) {
   dispatch(setView('otpVerification'));
   dispatch(resetResendTimer(20));
  }
 }, [isRequestOtpSuccess, dispatch]);

 // Handle OTP verification success
 useEffect(() => {
  if (isVerifyOtpSuccess) {
   dispatch(setView('resetPassword'));
  }
 }, [isVerifyOtpSuccess, dispatch]);

 const handleLoginSubmit = (email, password) => {
  login({ email, password });
 };

 const handleForgotPasswordSubmit = (email) => {
  dispatch(setEmail(email));
  requestOtp({ email });
 };

 const handleOtpVerificationSubmit = (otp) => {
  verifyOtp({ email, otp });
 };

 const handleResetPasswordSubmit = (password) => {
  resetPassword({ email, password });

  dispatch(setView('success'));
 };

 const handleSuccessClose = () => {
  dispatch(setView('login'));
 };

 const handleLoginRedirect = () => {
  dispatch(setView('login'));
 };

 const handleResendCode = () => {
  dispatch(resetResendTimer(20));
  requestOtp({ email });
 };

 return (
  <div className="flex w-full h-screen">
   {/* Left Side */}
   <div className="flex-1 flex flex-col h-full">
    {/* Top - Scavenger Hunt Title */}
    <div className="flex-none">
     <h1 className="font-poppins text-[24px] font-bold leading-[36px] text-center mt-8">
      Scavenger Hunt
     </h1>
    </div>

    {/* Middle - Dynamic Form */}
    <div className="flex-1 flex flex-col justify-center items-center">
     {view === 'login' && (
      <>
       <LoginForm
        onSubmit={handleLoginSubmit}
        onForgotPassword={() => dispatch(setView('forgotPassword'))}
       />
       {isLoginLoading && <p>Loading...</p>}
       {isLoginError && (
        <p style={{ color: 'red' }}>
         {loginError?.data?.message || 'Login failed'}
        </p>
       )}
      </>
     )}
     {view === 'forgotPassword' && (
      <ForgotPasswordForm
       onSubmit={handleForgotPasswordSubmit}
       email={email}
       setEmail={(email) => dispatch(setEmail(email))}
       isLoading={isRequestOtpLoading}
       error={
        isRequestOtpError
         ? requestOtpError?.data?.message || 'Failed to send OTP'
         : null
       }
      />
     )}
     {view === 'otpVerification' && (
      <OtpVerificationForm
       email={email}
       onSubmit={handleOtpVerificationSubmit}
       otp={otp}
       setOtp={(otp) => dispatch(setOtp(otp))}
       resendTimer={resendTimer}
       onResendCode={handleResendCode}
       isLoading={isVerifyOtpLoading}
       error={
        isVerifyOtpError
         ? verifyOtpError?.data?.message || 'OTP verification failed'
         : null
       }
      />
     )}
     {view === 'resetPassword' && (
      <CreateNewPasswordForm
       onSubmit={handleResetPasswordSubmit}
       isLoading={isResetPasswordLoading}
       error={
        isResetPasswordError
         ? resetPasswordError?.data?.message || 'Password reset failed'
         : null
       }
      />
     )}
     <SuccessPopup
      open={view === 'success'}
      onClose={handleSuccessClose}
      onLogin={handleLoginRedirect}
     />
    </div>
   </div>

   {/* Right Side - Image */}
   <div className="flex-1">
    <img
     className="w-full h-full object-cover"
     alt="Login Illustration"
     src="/image-13@2x.png"
    />
   </div>
  </div>
 );
};

export default LogInPage;
