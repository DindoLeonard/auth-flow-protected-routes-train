import React from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';

const Home = (): React.ReactElement => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const logout = useLogout();

  console.log(auth);

  const signOut = async () => {
    await logout();
    navigate('/linkpage');
  };

  return (
    <div>
      <h1>Home</h1>
      <button
        type="button"
        onClick={() => {
          navigate('about');
        }}
      >
        About
      </button>
      <button
        type="button"
        onClick={() => {
          navigate('/login');
        }}
        style={{ marginLeft: '10px' }}
      >
        Navigate login-page
      </button>
      <button
        type="button"
        // onClick={async () => {
        //   await axios.get('logout');
        //   setAuth(null);
        //   navigate('/linkpage');
        // }}
        onClick={signOut}
        style={{ marginLeft: '10px' }}
      >
        Logout
      </button>
      <p>Can't navigate login page if not logged out</p>
    </div>
  );
};

export default Home;
