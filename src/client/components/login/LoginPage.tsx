import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../../../styles/loginStyles.css';
import eye from '../../../styles/pine-eye.jpg';

const LoginPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);

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

  const togglePassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
  };

  return (
    <div className='login-page'>
      <div className='form-align'>
        <form className='login-form'>
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
      <div className='login-home-buttons'>
        <button type='submit' onClick={handleClick} className='login-page-btn'>
          Login
        </button>
        <button type='submit' onClick={onSubmit} className='go-back-again-btn'>
          Home
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
