import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const Login = (): React.ReactElement => {
  const navigate = useNavigate();
  const { setAuth, auth } = useContext(AuthContext);
  const location = useLocation();
  const state = location.state as { from: typeof location };
  const from = state?.from?.pathname || '/';

  return auth ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <div>
      <h1>Log in page</h1>
      <button
        type="button"
        onClick={() => {
          console.log('clicked');
          setAuth(true);
          // navigate('/');

          navigate(from, { replace: true });
        }}
      >
        login
      </button>
      <button
        type="button"
        onClick={() => {
          navigate(from, { replace: true });
        }}
        style={{ marginLeft: '10px' }}
      >
        navigate-home
      </button>
      <p>Can't navigate home if not logged-in</p>
    </div>
  );
};

export default Login;
