import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from './../context/AuthProvider';

const RequireAuth = (): React.ReactElement => {
  const ctx = useContext(AuthContext);
  const location = useLocation();

  console.log(ctx);
  console.log(location);

  return ctx.auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
