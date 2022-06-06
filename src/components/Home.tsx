import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const Home = (): React.ReactElement => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

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
        onClick={() => {
          setAuth(false);
        }}
        style={{ marginLeft: '10px' }}
      >
        Logout
      </button>
      <p>Can't navigate login page if not logged out</p>
    </div>
  );
};

export default Home;
