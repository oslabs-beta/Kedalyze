import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

function SignUpButton() {
  const navigate = useNavigate();

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/register');
  };

  return (
    <button type='submit' onClick={onSubmit} className='signup-btn'>
      Sign Up
    </button>
  );
}

const SignUp = () => {
  return (
    <Routes>
      <Route path='/' element={<SignUpButton />} />
    </Routes>
  );
};

export default SignUp;
