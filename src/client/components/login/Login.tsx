import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
    <button type='submit' onClick={onSubmit} className='login-btn'>
      Login
    </button>
  );
}
const Login = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginButton />} />
    </Routes>
  );
};

export default Login;
