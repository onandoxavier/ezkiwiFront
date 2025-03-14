import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/authHelper';

const PublicRoute: React.FC = () => {
  if (isAuthenticated()) {
    return <Navigate to="/queues" />;
  }

  return <Outlet />;
};

export default PublicRoute;
