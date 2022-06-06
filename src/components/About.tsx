import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = (): React.ReactElement => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default About;
