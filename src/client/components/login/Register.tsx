import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import '../../../styles/registerStyles.css';

function GoBack() {
  const navigate = useNavigate();

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className='register-page'>
      <div className='form-align'>
        <form className='signup-form'>
          <label>
            Username:
            <input type='text' name='username' />
          </label>
          <label>
            Password:
            <input type='text' name='password' />
          </label>
          <label>
            Email:
            <input type='text' name='email' />
          </label>
          <button type='submit' onClick={onSubmit} className='signup-page-btn'>
            Sign Up
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
}

// need a form to connect to dashboard

const Register = () => {
  return (
    <div className='register'>
      <h1>Register</h1>
      <Routes>
        <Route path='/' element={<GoBack />} />
      </Routes>
    </div>
  );
};

export default Register;
