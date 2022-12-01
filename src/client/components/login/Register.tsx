import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import '../../../styles/registerStyles.css';
import eye from '../../../styles/pine-eye.jpg';

function GoBack() {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/');
  };

  const togglePassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
  };

  return (
    <div className='register-page'>
      <div className='form-align'>
        <form className='signup-form'>
          <label>
            Email:
            <input type='text' name='email' />
          </label>
          <label>
            Username:
            <input type='text' name='username' />
          </label>
          <div className='pine'>
            <label>
              Password:
              <input type={passwordShown ? 'text' : 'password'} />
            </label>
          </div>
          <button onClick={togglePassword} className='pine-button'>
            <img src={eye} className='pine-eye' />
          </button>
        </form>
      </div>
      <div className='signup-home-buttons'>
        <button type='submit' onClick={onSubmit} className='signup-page-btn'>
          Sign Up
        </button>
        <button type='submit' onClick={onSubmit} className='go-back-again-btn'>
          Home
        </button>
      </div>
    </div>
  );
}

// need a form to connect to dashboard

const Register = () => {
  return (
    <div className='register'>
      <Routes>
        <Route path='/' element={<GoBack />} />
      </Routes>
    </div>
  );
};

export default Register;
