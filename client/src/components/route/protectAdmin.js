import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/context';

const AdminRoute = ({ children }) => {
  const { auth } = useGlobalContext();

  const isAuthenticated = !!auth?.token;

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Navigate to="/login" replace={true} />;
};

export default AdminRoute;
