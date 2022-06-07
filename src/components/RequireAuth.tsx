import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = (): React.ReactElement => {
  const authContext = useAuth();
  const location = useLocation();

  console.log(authContext);
  console.log(location);

  return authContext.auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
