import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  // If user already logged in, redirect away from public routes
  if (token) return <Navigate to="/" replace />;
  return children;
};

export default PublicRoute;
