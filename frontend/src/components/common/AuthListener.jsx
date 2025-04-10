// components/AuthListener.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthListener = ({ children }) => {
 const navigate = useNavigate();
 const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

 useEffect(() => {
  if (!isAuthenticated) {
   navigate('/', { replace: true });
  }
 }, [isAuthenticated, navigate]);

 return children;
};

export default AuthListener;
