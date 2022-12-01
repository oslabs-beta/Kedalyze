import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/login');
  };

  return (
    <div>
      <button type='submit' onClick={onSubmit} className='login-btn'>
        Login
      </button>
    </div>
  );
}
const Login = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<LoginButton />} />
        </Routes>
      </div>
    </>
  );
};

export default Login;
