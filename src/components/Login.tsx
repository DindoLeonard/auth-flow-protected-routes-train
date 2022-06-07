import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
const LOGIN_URL = '/auth';

const Login = (): React.ReactElement => {
  const navigate = useNavigate();
  const { setAuth, auth, persist, setPersist } = useAuth();
  const location = useLocation();
  const state = location.state as { from: typeof location };
  const from = state?.from?.pathname || '/';

  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const onLoginClick = async () => {
    try {
      //
      if (!email || !password) {
        return;
      }

      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      console.log(accessToken);
      setAuth({ email, password, accessToken });

      setEmail('');
      setPassword('');
    } catch (err: any) {
      //
      if (!err?.response) {
        console.log('No server response');
      } else if (err.response?.status === 400) {
        console.log('Missing Username or Password');
      } else if (err.response?.status === 401) {
        console.log('Unauthorized');
      } else {
        console.log('Login Failed');
      }
    }

    console.log('clicked');
    // setAuth(null);
    // navigate('/');

    // navigate(from, { replace: true });
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', persist.toString());
  }, [persist]);

  return auth ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <div>
      <h1>Log in page</h1>
      <button type="button" onClick={onLoginClick}>
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

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email || ''}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password || ''}
        />
      </div>
      <div>
        <input
          type="checkbox"
          id="persist"
          onChange={togglePersist}
          checked={persist}
        />
        <label htmlFor="persist">Trust This Device</label>
      </div>
    </div>
  );
};

export default Login;
