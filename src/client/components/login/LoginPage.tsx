import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../../../styles/loginStyles.css';

const LoginPage = () => {
  const navigate = useNavigate();

  // want to create some authentication for login
  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className='login-page'>
      <h1>Login</h1>
      <div className='form-align'>
        <form className='login-form'>
          <label>
            Username:
            <input type='text' name='username' />
          </label>
          <label>
            Password:
            <input type='text' name='password' />
          </label>
          <button
            type='submit'
            onClick={handleClick}
            className='login-page-btn'
          >
            Login
          </button>
          <button
            type='submit'
            onClick={onSubmit}
            className='go-back-again-btn'
          >
            Go Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;