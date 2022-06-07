import React from 'react';
import { useNavigate } from 'react-router-dom';
import Users from './Users';

const About = (): React.ReactElement => {
  const navigate = useNavigate();
  console.log('render');

  return (
    <div>
      <h1>About</h1>
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        navigate-back
      </button>

      <Users />
    </div>
  );
};

export default About;
