import React from 'react'
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/context';
const ProtectedRoute = ({ children }) => {

  const {auth} = useGlobalContext()
  
  return auth?.token != '' ? children : <Navigate to='/login' replace={true} />;
};

export default ProtectedRoute
