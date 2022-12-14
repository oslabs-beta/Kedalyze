import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/register');
  };
  return (
    <>
      <button type='submit' onClick={handleClick} className='signup-btn'>
        Sign Up
      </button>
    </>
  );
};

export default SignUp;
